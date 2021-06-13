import { useEffect, useState } from "react";
import { Navbar, NavbarBrand, Button, ButtonGroup } from "reactstrap";
import "./App.css";
import { heapSortHelper } from "./algorithms/heapSort";
import { countingSortHelper } from "./algorithms/coutingSort";
import { quickSortHelper } from "./algorithms/quickSort";
import { mergeSortHelper } from "./algorithms/mergeSort";
import { selectionSortHelper } from "./algorithms/selectionSort";
import { insertionSortHelper } from "./algorithms/insertionSort";
import { bubbleSortHelper } from "./algorithms/bubbleSort";
import {
  ThemeProvider,
  createGlobalStyle,
  ThemeProps,
} from "styled-components";
import DarkModeToggle from "react-dark-mode-toggle";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

export type ArrayBar = {
  height: number;
  color: string;
};

export type ThemeType = {
  mode: string;
};

const DEFUALT_COLOR = "teal";
const SWAP_COLOR = "red";

export default function App() {
  const [arrayBarGraph, setArrayBarGraph] = useState<Array<ArrayBar>>([]);
  const [arraySize, setArraySize] = useState<number | any>(100);
  const [animationSpeed, setAnimationSpeed] = useState<number | any>(0);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [theme, setTheme] = useState<ThemeType>({ mode: "light" });
  const GlobalStyle = createGlobalStyle`
    body{
      background-color: ${(props: ThemeProps<ThemeType>) =>
        props.theme.mode === "dark" ? "#111" : "#EEE"};
      color: ${(props: ThemeProps<ThemeType>) =>
        props.theme.mode === "dark" ? "#111" : "#EEE"};
    }
  `;

  useEffect(() => {
    const buildArray = [];
    for (let i = 0; i < arraySize; i++)
      buildArray.push({
        height: randomIntFromInterval(5, 500),
        color: DEFUALT_COLOR,
      });
    setArrayBarGraph(buildArray);
  }, [arraySize]);

  const randomIntFromInterval = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const resetArray = () => {
    const buildArray = [];
    for (let i = 0; i < arraySize; i++)
      buildArray.push({
        height: randomIntFromInterval(5, 500),
        color: DEFUALT_COLOR,
      });
    setArrayBarGraph(buildArray);
  };

  const handleAnimations = (animations: Array<any>) => {
    setDisabled(true);
    for (let i = 0; i <= animations.length; i++) {
      if (i === animations.length) {
        setTimeout(() => {
          setDisabled(false);
        }, -animationSpeed * i);
        return;
      }
      const newArrayBarGraph = [...arrayBarGraph];
      const [barOneIdx, barTwoIndexorSwapHeight, swap, reset] = animations[i];
      if (swap) {
        setTimeout(() => {
          newArrayBarGraph[barOneIdx].height = barTwoIndexorSwapHeight;
          setArrayBarGraph(newArrayBarGraph);
        }, -animationSpeed * i);
      } else {
        setTimeout(() => {
          const color = reset ? DEFUALT_COLOR : SWAP_COLOR;
          newArrayBarGraph[barOneIdx].color = color;
          newArrayBarGraph[barTwoIndexorSwapHeight].color = color;
          setArrayBarGraph(newArrayBarGraph);
        }, -animationSpeed * i);
      }
    }
  };

  const heapSort = () => {
    const currentArray = [...arrayBarGraph];
    const animations: Array<any> = [];
    heapSortHelper(currentArray, animations);
    handleAnimations(animations);
  };

  const countingSort = () => {
    const currentArray = [...arrayBarGraph];
    const animations: Array<any> = [];
    countingSortHelper(currentArray, 1, 700, animations);
    handleAnimations(animations);
  };

  const quickSort = () => {
    const currentArray = [...arrayBarGraph];
    if (currentArray.length <= 1) return currentArray;
    const animations: Array<any> = [];
    quickSortHelper(currentArray, 0, currentArray.length, animations);
    handleAnimations(animations);
  };

  const mergeSort = () => {
    const currentArray = [...arrayBarGraph];
    const tempArray = currentArray.slice();
    const animations: Array<any> = [];
    if (currentArray.length <= 1) return currentArray;
    mergeSortHelper(
      currentArray,
      0,
      currentArray.length - 1,
      tempArray,
      animations
    );
    handleAnimations(animations);
  };

  const selectionSort = () => {
    const currentArray = [...arrayBarGraph];
    const animations = selectionSortHelper(currentArray);
    handleAnimations(animations);
  };

  const insertionSort = () => {
    const currentArray = [...arrayBarGraph];
    const animations = insertionSortHelper(currentArray);
    handleAnimations(animations);
  };

  const bubbleSort = () => {
    const currentArray = [...arrayBarGraph];
    console.log(arrayBarGraph);
    const animations = bubbleSortHelper(currentArray);
    handleAnimations(animations);
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Navbar color="dark">
          <NavbarBrand
            href="#"
            className="text-white"
            onClick={() => window.location.reload()}
          >
            SortingVisualizer
          </NavbarBrand>
          <DarkModeToggle
            onChange={() =>
              setTheme(
                theme.mode === "dark" ? { mode: "light" } : { mode: "dark" }
              )
            }
            checked={theme.mode === "dark"}
            size={70}
          ></DarkModeToggle>
          <Button
            onClick={() => resetArray()}
            className="btn bg-transparent  text-white"
            disabled={disabled}
          >
            Generate New Array
          </Button>
          <div id="len" style={{ width: 150 }} className="text-white">
            Array Length
            <InputRange
              minValue={2}
              maxValue={100}
              value={arraySize}
              onChange={(val) => {
                setArraySize(val);
              }}
              onChangeComplete={(val) => setArraySize(val)}
              disabled={disabled}
            ></InputRange>
          </div>
          <div id="ani" style={{ width: 150 }} className="text-white">
            Animation Speed
            <InputRange
              minValue={-100}
              maxValue={0}
              value={animationSpeed}
              onChange={(val) => {
                setAnimationSpeed(val);
              }}
              onChangeComplete={(val) => {
                setAnimationSpeed(val);
              }}
              disabled={disabled}
            ></InputRange>
          </div>
          <ButtonGroup>
            <Button
              onClick={() => bubbleSort()}
              className="btn bg-transparent  text-white"
              disabled={disabled}
            >
              Bubble Sort
            </Button>
            <Button
              onClick={() => selectionSort()}
              className="btn bg-transparent  text-white"
              disabled={disabled}
            >
              Selection Sort
            </Button>
            <Button
              onClick={() => insertionSort()}
              className="btn bg-transparent  text-white"
              disabled={disabled}
            >
              Insertion Sort
            </Button>
            <Button
              onClick={() => mergeSort()}
              className="btn bg-transparent  text-white"
              disabled={disabled}
            >
              Merge Sort
            </Button>
            <Button
              onClick={() => heapSort()}
              className="btn bg-transparent  text-white"
              disabled={disabled}
            >
              Heap Sort
            </Button>
            <Button
              onClick={() => quickSort()}
              className="btn bg-transparent  text-white"
              disabled={disabled}
            >
              Quick Sort
            </Button>
            <Button
              onClick={() => {
                countingSort();
              }}
              className="btn bg-transparent  text-white"
              disabled={disabled}
            >
              Counting Sort
            </Button>
          </ButtonGroup>
        </Navbar>
        <div className="array-container">
          {arrayBarGraph.map((value, idx) => (
            <div
              className="array-bar-graph"
              key={idx}
              style={{
                backgroundColor: value.color,
                height: `${value.height}px`,
                width: `${1000 / arrayBarGraph.length}px`,
              }}
            ></div>
          ))}
        </div>
      </>
    </ThemeProvider>
  );
}
