import React from 'react';
import { Navbar, NavbarBrand, Button, ButtonGroup, Label } from 'reactstrap';
import { Fade } from 'react-animation-components';
import InputRange from 'react-input-range';
import '../App.css';
import "react-input-range/lib/css/index.css";
export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      arraybarvalue:210,
      animationspeed:49,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.arraybarvalue; i++) {
      array.push(randomIntFromInterval(5, 570));
    }
    this.setState({ array });
  }

  handleAnimations(animations) {
    document.getElementById("reset").disabled = true;
    document.getElementById("bubble").disabled = true;
    document.getElementById("select").disabled = true;
    document.getElementById("insert").disabled = true;
    document.getElementById("merge").disabled = true;
    document.getElementById("heap").disabled = true;
    document.getElementById("quick").disabled = true;
    document.getElementById("count").disabled = true;
    document.getElementById("len").style.pointerEvents="none";
    document.getElementById("len").style.opacity=0.5;
    document.getElementById("ani").style.pointerEvents="none";
    document.getElementById("ani").style.opacity = 0.5;
    const arrayBarGraph = document.getElementsByClassName('array-bar-graph');
    let i;
    for (i = 0; i < animations.length; i++) {
      const [barone, bartwo, swap, reset] = animations[i];
      if (swap) {
        setTimeout(() => {
          const barOneStyle = arrayBarGraph[barone].style;
          barOneStyle.height = `${bartwo}px`;
          barOneStyle.color = "tuquoise";
        }, i *(50- this.state.animationspeed+0.7));
      }
      else {
        setTimeout(() => {
          const color = reset ? "turquoise" : "red";
          const barOneStyle = arrayBarGraph[barone].style;
          const barTwoStyle = arrayBarGraph[bartwo].style;
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i *(50- this.state.animationspeed+0.7));
      }
    }
    setTimeout(function () {
      document.getElementById("reset").disabled = false;
      document.getElementById("bubble").disabled = false;
      document.getElementById("select").disabled = false;
      document.getElementById("insert").disabled = false;
      document.getElementById("merge").disabled = false;
      document.getElementById("heap").disabled = false;
      document.getElementById("quick").disabled = false;
      document.getElementById("count").disabled = false;
      document.getElementById("len").style.pointerEvents="unset";
      document.getElementById("len").style.opacity = 1;
      document.getElementById("ani").style.pointerEvents="unset";
      document.getElementById("ani").style.opacity = 1;
    }, i * (50-this.state.animationspeed+0.7));
  }

  heapSort() {
    const myarray = this.state.array;
    const animations = [];
    this.heapSortHelper(myarray, animations);
    this.handleAnimations(animations);
  }

  heap_root(input, i, array_length, animations) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;
    if (left < array_length && input[left] > input[max]) {
      animations.push([left, max, false, false]);
      animations.push([left, max, false, true]);
      max = left;
    }
    if (right < array_length && input[right] > input[max]) {
      animations.push([right, max, false, false]);
      animations.push([right, max, false, true]);
      max = right;
    }
    if (max !== i) {
      animations.push([max, i, false, false]);
      animations.push([max, i, false, true]);
      animations.push([i, input[max], true, false]);
      animations.push([max, input[max], true, false]);
      var temp = input[i];
      input[i] = input[max];
      input[max] = temp;
      this.heap_root(input, max, array_length, animations);
    }
  }

  heapSortHelper(input, animations) {
    var array_length = input.length;
    for (var i = Math.floor(array_length / 2); i >= 0; i -= 1) {
      this.heap_root(input, i, array_length, animations);
    }
    for (i = input.length - 1; i > 0; i--) {
      animations.push([0, input[i], true, false]);
      animations.push([i, input[0], true, false]);
      var temp = input[0];
      input[0] = input[i];
      input[i] = temp;
      array_length--;
      this.heap_root(input, 0, array_length, animations);
    }
    return animations;
  }

  countingSort() {
    const myarray = this.state.array;
    const animations = this.countingSortHelper(myarray, 1, 700);
    this.handleAnimations(animations);
  }

  countingSortHelper(myarray, min, max) {
    const animations = [];
    let countarray = [], j = 0;
    for (let i = min; i <= max; i++) {
      countarray[i] = 0;
    }
    for (let i = 0; i < myarray.length; i++) {
      countarray[myarray[i]]++;
      animations.push([i, i, false, false]);
      animations.push([i, i, false, true]);

    }
    for (let i = min; i <= max; i++) {
      while (countarray[i] > 0) {
        myarray[j] = i;
        animations.push([j, i, true, false]);
        j++;
        countarray[i]--;
      }
    }
    return animations;
  }

  quickSort() {
    const myarray = this.state.array;
    const animations = [];
    if (myarray.length <= 1) return myarray;
    this.quickSortHelper(myarray, 0, myarray.length, animations);
    this.handleAnimations(animations);
  }

  quickSortHelper(myarray, start, end, animations) {
    if (end - start < 2) return;
    const pivot = this.partition(myarray, start, end, animations);
    this.quickSortHelper(myarray, start, pivot, animations);
    this.quickSortHelper(myarray, pivot + 1, end, animations);

  }

  partition(myarray, start, end, animations) {
    let i = start, j = end;
    let piv = myarray[start];
    while (i < j) {
      while (i < j && myarray[--j] >= piv) {
        animations.push([i, j, false, false]);
        animations.push([i, j, false, true]);
      }
      if (i < j) {
        animations.push([i, myarray[j], true, false]);
        myarray[i] = myarray[j];
      }
      while (i < j && myarray[++i] <= piv) {
        animations.push([i, j, false, false]);
        animations.push([i, j, false, true]);
      }
      if (i < j) {
        animations.push([j, myarray[i], true, false]);
        myarray[j] = myarray[i];
      }
    }
    animations.push([j, piv, true, false]);
    myarray[j] = piv;
    return j;
  }

  mergeSort() {
    const myarray = this.state.array;
    const animations = [];
    if (myarray.length <= 1) return myarray;
    const tempArray = myarray.slice();
    this.mergeSortHelper1(myarray, 0, myarray.length - 1, tempArray, animations);
    this.handleAnimations(animations);
  }
  mergeSortHelper1(myarray, start, end, tempArray, animations) {

    if (start === end) return;
    const mid = Math.floor((start + end) / 2);
    this.mergeSortHelper1(tempArray, start, mid, myarray, animations);
    this.mergeSortHelper1(tempArray, mid + 1, end, myarray, animations);
    this.doMerge(myarray, start, mid, end, tempArray, animations);
  }

  doMerge(myarray, start, mid, end, tempArray, animations) {
    let k = start;
    let i = start;
    let j = mid + 1;
    while (i <= mid && j <= end) {
      animations.push([i, j, false, false]);
      animations.push([i, j, false, true]);
      if (tempArray[i] <= tempArray[j]) {
        animations.push([k, tempArray[i], true, false]);
        myarray[k++] = tempArray[i++];
      } else {
        animations.push([k, tempArray[j], true, false]);
        myarray[k++] = tempArray[j++];
      }
    }
    while (i <= mid) {
      animations.push([i, i, false, false]);
      animations.push([i, i, false, true]);
      animations.push([k, tempArray[i], true, false]);
      myarray[k++] = tempArray[i++];
    }
    while (j <= end) {
      animations.push([j, j, false, false]);
      animations.push([j, j, false, true]);
      animations.push([k, tempArray[j], true, false]);
      myarray[k++] = tempArray[j++];
    }
  }

  selectionSortHelper() {
    const animations = [];
    const myarray = this.state.array;
    for (let i = 0; i < myarray.length - 1; i++) {
      let min_idx = i;
      for (let j = i + 1; j < myarray.length; j++) {
        animations.push([j, min_idx, false, false]);
        if (myarray[j] < myarray[min_idx])
          min_idx = j;
        animations.push([j, min_idx, false, true]);
      }
      animations.push([i, min_idx, false, true]);
      let temp = myarray[min_idx];
      animations.push([min_idx, myarray[i], true, false]);
      myarray[min_idx] = myarray[i];
      animations.push([i, temp, true, false]);
      myarray[i] = temp;
    }
    return animations;
  }
  selectionSort() {
    const animations = this.selectionSortHelper();
    this.handleAnimations(animations);
  }
  insertionSortHelper() {
    const animations = [];
    const myarray = this.state.array;
    for (let i = 1; i < myarray.length; i++) {
      let ele = myarray[i];
      let j;
      for (j = i; j > 0 && myarray[j - 1] > ele; j--) {
        animations.push([j - 1, j, false, false]);
        myarray[j] = myarray[j - 1];
        animations.push([j, myarray[j - 1], true, false]);
        animations.push([j - 1, j, false, true]);
      }
      animations.push([j, ele, true, false]);
      myarray[j] = ele;
    }
    return animations;

  }
  insertionSort() {
    const animations = this.insertionSortHelper();
    this.handleAnimations(animations);
  }
  bubbleSortHelper(myarray) {
    const animations = [];
    for (let i = 0; i < myarray.length - 1; i++) {
      for (let j = 0; j < myarray.length - i - 1; j++) {
        animations.push([j, j + 1, false, false]);
        if (myarray[j] > myarray[j + 1]) {
          animations.push([j, myarray[j + 1], true, false]);
          animations.push([j + 1, myarray[j], true, false]);
          let temp = myarray[j];
          myarray[j] = myarray[j + 1];
          myarray[j + 1] = temp;
        }
        animations.push([j, j + 1, false, true]);
      }
    }
    return animations;
  }

  bubbleSort() {
    const myarray = this.state.array;
    const animations = this.bubbleSortHelper(myarray);
    this.handleAnimations(animations);
  }

  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 70);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = this.heapSort(array);
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  handleChange(val){
    this.setState({arraybarvalue:val});
    this.resetArray();
  }

  handleAnimationChange(val){
    this.setState({animationspeed:val});
  }

  render() {
    const { array } = this.state;

    return (

      <>
        <Navbar color="dark">
          <NavbarBrand href="#" className="text-white">SortingVisualizer</NavbarBrand>
          <Button onClick={() => this.resetArray()} id="reset" className="btn bg-transparent  text-white">Generate New Array</Button>
          <div id="len" style={{width:150}}  className="e-disabled text-white" >Array Length<InputRange     style={{width:50}} step={2} minValue={10} maxValue={210} value={this.state.arraybarvalue} onChange={val => this.setState({ arraybarvalue: val })} onChangeComplete={val=>this.handleChange(val)}></InputRange></div>
          <div id="ani"  style={{width:150}}  className="text-white" >Animation Speed<InputRange    style={{width:50}} step={2} minValue={1} maxValue={49} value={this.state.animationspeed} onChange={val => this.setState({ animationspeed: val })} onChangeComplete={val=>this.handleAnimationChange(val)}></InputRange></div>
          <ButtonGroup>
            <Button onClick={() => this.bubbleSort()} id="bubble" className="btn bg-transparent  text-white">Bubble Sort</Button>
            <Button onClick={() => this.selectionSort()} id="select" className="btn bg-transparent  text-white">Selection Sort</Button>
            <Button onClick={() => this.insertionSort()} id="insert" className="btn bg-transparent  text-white">Insertion Sort</Button>
            <Button onClick={() => this.mergeSort()} id="merge" className="btn bg-transparent  text-white">Merge Sort</Button>
            <Button onClick={() => this.heapSort()} id="heap" className="btn bg-transparent  text-white">Heap Sort</Button>
            <Button onClick={() => this.quickSort()} id="quick" className="btn bg-transparent  text-white">Quick Sort</Button>
            <Button onClick={() => this.countingSort()} id="count" className="btn bg-transparent  text-white">Counting Sort</Button>
          </ButtonGroup>
        </Navbar>
        <div className="array-container">
          <Fade in>
            {array.map((value, idx) => (
              <div
                className="array-bar-graph"
                key={idx}
                style={{
                  backgroundColor: "turquoise",
                  height: `${value}px`,
                  width: array.length>25?array.length>50?array.length>100?array.length>150?array.length>170?"4px":"6px":"7px":"12px":"22px":"55px",
                }}></div>
            ))}
          </Fade>
        </div>
      </>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      console.log(arrayTwo[i]);
      console.log(arrayOne[i]);
      return false;
    }
  }
  return true;
}