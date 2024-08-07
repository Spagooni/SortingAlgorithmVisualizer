import React from 'react';
import * as sortingAlgorithms from '../SortingAlgorithm/SortingAlgorithm';
import './SortingVisualizer.css';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < 150; i++) {
      array.push(randomIntFromInterval(5, 750));
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = sortingAlgorithms.mergeSort(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar'); // Define arrayBars outside the loop

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const colour = i % 3 === 0 ? 'red' : 'blue';

        setTimeout(() => {
          barOneStyle.backgroundColor = colour;
          barTwoStyle.backgroundColor = colour;
        }, i * 10);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * 10);
      }
    }

    setTimeout(() => {
      for (let k = 0; k < arrayBars.length; k++) {
        setTimeout(() => {
          arrayBars[k].style.backgroundColor = 'green';
        }, k * 3.25);
      }
    }, animations.length * 10);
  }

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${value}px` }}
          ></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
