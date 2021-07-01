import { useEffect, useState } from "react";
import {
    Navbar,
    NavbarBrand,
    Button,
    UncontrolledTooltip,
    Collapse,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavLink,
} from "reactstrap";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

export type ArrayBar = {
    height: number;
    color: string;
};

export type ThemeType = {
    mode: string;
};

export enum SwapType {
    SWAP,
    CHANGE_COLOR,
    RESET,
    COPY,
}

enum buttonType {
    PLAY,
    PAUSE,
}

const DEFUALT_COLOR = "teal";
const SWAP_COLOR = "red";

export default function App() {
    const [arrayBarGraph, setArrayBarGraph] = useState<Array<ArrayBar>>([]);
    const [arraySize, setArraySize] = useState<number | any>(100);
    const [animationSpeed, setAnimationSpeed] = useState<number | any>(0);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [animationArray, setAnimationArray] = useState<Array<any>>([]);
    const [animArrIdx, setAnimArrIdx] = useState<number>(0);
    const [timeouts, setTimeouts] = useState<Array<any>>([]);
    const [buttonState, setButtonState] = useState<buttonType>(buttonType.PLAY);
    const [theme, setTheme] = useState<ThemeType>({ mode: "dark" });
    const [isOpen, setIsOpen] = useState(false);
    const [currentAlgorithm, setCurrentAlgorithm] =
        useState<string>("Visualize!");
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

    const handleAnimations = () => {
        const newTimeouts: Array<any> = [];
        const animations = [...animationArray];
        for (let i = animArrIdx; i <= animations.length; i++) {
            if (i === animations.length) {
                newTimeouts.push(
                    setTimeout(() => {
                        setTimeouts(newTimeouts);
                        setAnimationArray([]);
                        setButtonState(buttonType.PLAY);
                        setDisabled(false);
                        setAnimArrIdx(0);
                    }, -animationSpeed * (i - animArrIdx)),
                );
                return;
            } else if (i === animArrIdx) {
                setDisabled(true);
                setButtonState(buttonType.PAUSE);
            }
            const newArrayBarGraph = [...arrayBarGraph];
            const [barOneIdx, barTwoIdx, swapType] = animations[i];
            if (swapType === SwapType.SWAP) {
                newTimeouts.push(
                    setTimeout(() => {
                        const temp = newArrayBarGraph[barOneIdx].height;
                        newArrayBarGraph[barOneIdx].height =
                            newArrayBarGraph[barTwoIdx].height;
                        newArrayBarGraph[barTwoIdx].height = temp;
                        setArrayBarGraph(newArrayBarGraph);
                        setTimeouts(newTimeouts);
                        setAnimArrIdx(i);
                    }, -animationSpeed * (i - animArrIdx)),
                );
            } else if (swapType === SwapType.COPY) {
                newTimeouts.push(
                    setTimeout(() => {
                        newArrayBarGraph[barOneIdx].height = barTwoIdx;
                        setArrayBarGraph(newArrayBarGraph);
                        setTimeouts(newTimeouts);
                        setAnimArrIdx(i);
                    }, -animationSpeed * (i - animArrIdx)),
                );
            } else {
                newTimeouts.push(
                    setTimeout(() => {
                        const color =
                            swapType === SwapType.RESET
                                ? DEFUALT_COLOR
                                : SWAP_COLOR;
                        newArrayBarGraph[barOneIdx].color = color;
                        newArrayBarGraph[barTwoIdx].color = color;
                        setArrayBarGraph(newArrayBarGraph);
                        setTimeouts(newTimeouts);
                        setAnimArrIdx(i);
                    }, -animationSpeed * (i - animArrIdx)),
                );
            }
        }
    };

    useEffect(() => {
        handleAnimations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animationArray.length]);

    const randomIntFromInterval = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min + 1) + min);

    const handleAnimationState = () => {
        setDisabled(false);
        setButtonState(buttonType.PLAY);
        let leftAnimations = [...timeouts];
        while (leftAnimations.length) {
            clearTimeout(leftAnimations.pop());
        }
        setTimeouts([]);
    };
    const resetArray = () => {
        const buildArray = [];
        setAnimationArray([]);
        setAnimArrIdx(0);
        for (let i = 0; i < arraySize; i++)
            buildArray.push({
                height: randomIntFromInterval(5, 500),
                color: DEFUALT_COLOR,
            });
        setArrayBarGraph(buildArray);
    };

    const heapSort = () => {
        const currentArray = [...arrayBarGraph];
        const animations: Array<any> = [];
        heapSortHelper(currentArray, animations);
        setAnimationArray(animations);
        setAnimArrIdx(0);
    };

    const countingSort = () => {
        const currentArray = [...arrayBarGraph];
        const animations: Array<any> = [];
        countingSortHelper(currentArray, 1, 700, animations);
        setAnimationArray(animations);
        setAnimArrIdx(0);
    };

    const quickSort = () => {
        const currentArray = [...arrayBarGraph];
        if (currentArray.length <= 1) return currentArray;
        const animations: Array<any> = [];
        quickSortHelper(currentArray, 0, currentArray.length, animations);
        setAnimationArray(animations);
        setAnimArrIdx(0);
    };

    const mergeSort = () => {
        const currentArray = [...arrayBarGraph];
        const tempArray = currentArray.slice();
        const animations: Array<any> = [];
        mergeSortHelper(
            currentArray,
            0,
            currentArray.length - 1,
            tempArray,
            animations,
        );
        setAnimationArray(animations);
        setAnimArrIdx(0);
    };

    const selectionSort = () => {
        const currentArray = [...arrayBarGraph];
        const animations = selectionSortHelper(currentArray);
        setAnimationArray(animations);
        setAnimArrIdx(0);
    };

    const insertionSort = () => {
        const currentArray = [...arrayBarGraph];
        const animations = insertionSortHelper(currentArray);
        setAnimationArray(animations);
        setAnimArrIdx(0);
    };

    const bubbleSort = () => {
        const currentArray = [...arrayBarGraph];
        const animations = bubbleSortHelper(currentArray);
        setAnimationArray(animations);
        setAnimArrIdx(0);
    };

    const handleAlgorithms = () => {
        const cA = currentAlgorithm;
        const chosenAlgorithm = cA.split(" ");
        if (chosenAlgorithm.length === 1) {
            setCurrentAlgorithm("Pick an Algorithm!");
            return;
        }
        console.log(chosenAlgorithm[1]);
        switch (chosenAlgorithm[1]) {
            case "Bubble":
                bubbleSort();
                break;
            case "Selection":
                selectionSort();
                break;
            case "Insertion":
                insertionSort();
                break;
            case "Heap":
                heapSort();
                break;
            case "Merge":
                mergeSort();
                break;
            case "Quick":
                quickSort();
                break;
            case "Counting":
                countingSort();
                break;
            default:
                return;
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <>
                <GlobalStyle />
                <Navbar
                    color="dark"
                    dark
                    expand="md"
                    className="navbar-no-y-padding"
                >
                    <NavbarBrand
                        href="/SortingVisualizerAlpha"
                        style={{ marginLeft: "1vw" }}
                    >
                        SortingVisualizerAlpha
                    </NavbarBrand>
                    <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem
                                className="navitem"
                                style={{ paddingTop: 6 }}
                            >
                                <DarkModeToggle
                                    onChange={() =>
                                        setTheme(
                                            theme.mode === "dark"
                                                ? { mode: "light" }
                                                : { mode: "dark" },
                                        )
                                    }
                                    checked={theme.mode === "dark"}
                                    size={50}
                                ></DarkModeToggle>
                            </NavItem>
                            <NavItem className="navitem">
                                <NavLink
                                    onClick={() => resetArray()}
                                    disabled={disabled}
                                    style={{ cursor: "pointer" }}
                                >
                                    Generate New Array
                                </NavLink>
                            </NavItem>
                            <NavItem className="navitem">
                                <div
                                    className="text-white"
                                    style={{ width: 150 }}
                                >
                                    Array Length
                                    <InputRange
                                        minValue={2}
                                        maxValue={100}
                                        value={arraySize}
                                        onChange={(val) => {
                                            setArraySize(val);
                                        }}
                                        onChangeComplete={(val) =>
                                            setArraySize(val)
                                        }
                                        disabled={disabled}
                                    ></InputRange>
                                </div>
                            </NavItem>
                            <NavItem className="navitem">
                                <div
                                    className="text-white"
                                    style={{ width: 150 }}
                                >
                                    Animation Speed
                                    <InputRange
                                        minValue={-800}
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
                            </NavItem>
                            <UncontrolledDropdown
                                nav
                                inNavbar
                                disabled={disabled}
                            >
                                <DropdownToggle nav caret>
                                    Select an Algorithm
                                </DropdownToggle>
                                <DropdownMenu right color="dark">
                                    <DropdownItem
                                        onClick={() => {
                                            setCurrentAlgorithm(
                                                "Visualize Bubble Sort!",
                                            );
                                        }}
                                    >
                                        Bubble Sort
                                    </DropdownItem>
                                    <DropdownItem
                                        onClick={() => {
                                            setCurrentAlgorithm(
                                                "Visualize Selection Sort!",
                                            );
                                        }}
                                    >
                                        Selection Sort
                                    </DropdownItem>
                                    <DropdownItem
                                        onClick={() => {
                                            setCurrentAlgorithm(
                                                "Visualize Insertion Sort!",
                                            );
                                        }}
                                    >
                                        Insertion Sort
                                    </DropdownItem>
                                    <DropdownItem
                                        onClick={() => {
                                            setCurrentAlgorithm(
                                                "Visualize Heap Sort!",
                                            );
                                        }}
                                    >
                                        Heap Sort
                                    </DropdownItem>
                                    <DropdownItem
                                        onClick={() => {
                                            setCurrentAlgorithm(
                                                "Visualize Merge Sort!",
                                            );
                                        }}
                                    >
                                        Merge Sort
                                    </DropdownItem>
                                    <DropdownItem
                                        onClick={() => {
                                            setCurrentAlgorithm(
                                                "Visualize Quick Sort!",
                                            );
                                        }}
                                    >
                                        Quick Sort
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem className="navitem">
                                <NavLink
                                    onClick={() => handleAlgorithms()}
                                    disabled={disabled}
                                    style={{ cursor: "pointer" }}
                                >
                                    {currentAlgorithm}
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Navbar color="dark"></Navbar>
                <div className="array-container">
                    {arrayBarGraph.map((value, idx) => (
                        <>
                            <div
                                className="array-bar-graph"
                                key={idx}
                                style={{
                                    backgroundColor: value.color,
                                    height: `${value.height}px`,
                                    width: `${1000 / arrayBarGraph.length}px`,
                                }}
                                id={"tooltip" + idx}
                            ></div>
                            <UncontrolledTooltip
                                placement="top"
                                target={"tooltip" + idx}
                            >
                                {value.height}
                            </UncontrolledTooltip>
                        </>
                    ))}
                </div>
                <div className="center-div">
                    {buttonState === buttonType.PLAY ? (
                        <Button onClick={handleAnimations}>
                            <FontAwesomeIcon icon={faPlay} size="lg" />
                        </Button>
                    ) : (
                        <Button onClick={handleAnimationState}>
                            <FontAwesomeIcon icon={faPause} size="lg" />
                        </Button>
                    )}
                </div>
            </>
        </ThemeProvider>
    );
}
