import React from 'react';
// import mergeSort from '../sortingAlgorithms/mergeSort.js';
import {getInsertionSortAnimations} from '../sortingAlgorithms/insertionSort.js';
import {getQuickSortAnimations} from '../sortingAlgorithms/quickSort.js';
import {getMergeSortAnimations} from '../sortingAlgorithms/mergeSort.js';
import {getBubbleSortAnimations} from '../sortingAlgorithms/bubbleSort.js';
import {getSelectionSortAnimations} from '../sortingAlgorithms/selectionSort.js';
import './SortingVisualizer.css';

const ANIMATION_SPEED_MS = 5;
const NUMBER_OF_ARRAY_BARS = 101;
const PRIMARY_COLOR = 'blue';
const SECONDARY_COLOR = 'red';

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
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 650));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    console.log("animations received");
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const [animations,sortArray] = getQuickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
        const isColorChange = animations[i][0] == "comparision1" || animations[i][0] == "comparision2";
        const arrayBars = document.getElementsByClassName('array-bar');
        if(isColorChange === true) {
            const color = (animations[i][0] == "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
            const [comparision, barOneIndex, barTwoIndex] = animations[i];
            const barOneStyle = arrayBars[barOneIndex].style;
            const barTwoStyle = arrayBars[barTwoIndex].style;
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            },i * ANIMATION_SPEED_MS);
        }
        else {
            const [swap, barIndex, newHeight] = animations[i];
            if (barIndex === -1) {
                continue;
            }
            const barStyle = arrayBars[barIndex].style;
            setTimeout(() => {
                barStyle.height = `${newHeight}px`;
            },i * ANIMATION_SPEED_MS);  
        }        }
    // this.setState({array: sortArray})

}


selectionSort() {
  const [animations,sortArray] = getSelectionSortAnimations(this.state.array);
  for (let i = 0; i < animations.length; i++) {
      const isColorChange = (animations[i][0] === "comparision1") || (animations[i][0] === "comparision2");
      const arrayBars = document.getElementsByClassName('array-bar');
      if(isColorChange === true) {
          const color = (animations[i][0] === "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
          const [temp, barOneIndex, barTwoIndex] = animations[i];
          const barOneStyle = arrayBars[barOneIndex].style;
          const barTwoStyle = arrayBars[barTwoIndex].style;
          setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
          },i * ANIMATION_SPEED_MS);
      }
      else {
          const [temp, barIndex, newHeight] = animations[i];
          const barStyle = arrayBars[barIndex].style;
          setTimeout(() => {
              barStyle.height = `${newHeight}px`;
          },i * ANIMATION_SPEED_MS);  
      }
  }
  // this.setState({array: sortArray})
}

  bubbleSort() {
    const [animations,sortArray] = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
        const isColorChange = animations[i][0] == "comparision1" || animations[i][0] == "comparision2";
        const arrayBars = document.getElementsByClassName('array-bar');
        if(isColorChange === true) {
            const color = (animations[i][0] == "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
            const [comparision, barOneIndex, barTwoIndex] = animations[i];
            const barOneStyle = arrayBars[barOneIndex].style;
            const barTwoStyle = arrayBars[barTwoIndex].style;
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            },i * ANIMATION_SPEED_MS);
        }
        else {
            const [swap, barIndex, newHeight] = animations[i];
            if (barIndex === -1) {
                continue;
            }
            const barStyle = arrayBars[barIndex].style;
            setTimeout(() => {
                barStyle.height = `${newHeight}px`;
            },i * ANIMATION_SPEED_MS);  
        }
    }
    // this.setState({array: sortArray})    
}

insertionSort() {
  const [animations,sortArray] = getInsertionSortAnimations(this.state.array);
  for (let i = 0; i < animations.length; i++) {
      const isColorChange = (animations[i][0] === "comparision1") || (animations[i][0] === "comparision2");
      const arrayBars = document.getElementsByClassName('array-bar');
      if(isColorChange === true) {
          const color = (animations[i][0] === "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
          const [temp, barOneIndex, barTwoIndex] = animations[i];
          const barOneStyle = arrayBars[barOneIndex].style;
          const barTwoStyle = arrayBars[barTwoIndex].style;
          setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
          },i * ANIMATION_SPEED_MS);
      }
      else {
          const [temp, barIndex, newHeight] = animations[i];
          const barStyle = arrayBars[barIndex].style;
          setTimeout(() => {
              barStyle.height = `${newHeight}px`;
          },i * ANIMATION_SPEED_MS);  
      }
  }
  // this.setState({array: sortArray})
}

  

  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.selectionSort()}>Selection Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.insertionSort()}>Insertion Sort</button>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

