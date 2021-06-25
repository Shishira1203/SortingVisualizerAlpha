import { ArrayBar, SwapType } from "../App";

const heapRoot = (
  array: Array<ArrayBar>,
  i: number,
  arrayLength: number,
  animations: Array<any>
) => {
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  let max = i;
  if (left < arrayLength && array[left].height > array[max].height) {
    animations.push([left, max, SwapType.CHANGE_COLOR]);
    animations.push([left, max, SwapType.RESET]);
    max = left;
  }
  if (right < arrayLength && array[right].height > array[max].height) {
    animations.push([right, max, SwapType.CHANGE_COLOR]);
    animations.push([right, max, SwapType.RESET]);
    max = right;
  }
  if (max !== i) {
    animations.push([max, i, SwapType.CHANGE_COLOR]);
    animations.push([max, i, SwapType.RESET]);
    animations.push([i, max, SwapType.SWAP]);
    let temp = array[i];
    array[i] = array[max];
    array[max] = temp;
    heapRoot(array, max, arrayLength, animations);
  }
};

export const heapSortHelper = (
  array: Array<ArrayBar>,
  animations: Array<any>
) => {
  let arrayLength = array.length;
  for (let i = Math.floor(arrayLength / 2); i >= 0; i -= 1) {
    heapRoot(array, i, arrayLength, animations);
  }
  for (let i = array.length - 1; i > 0; i--) {
    animations.push([0, i, SwapType.SWAP]);
    let temp = array[0];
    array[0] = array[i];
    array[i] = temp;
    arrayLength--;
    heapRoot(array, 0, arrayLength, animations);
  }
  return animations;
};
