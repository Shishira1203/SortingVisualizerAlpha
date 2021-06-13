import { ArrayBar } from "../App";

export const bubbleSortHelper = (array: Array<ArrayBar>) => {
  const animations = [];
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      animations.push([j, j + 1, false, false]);
      if (array[j].height > array[j + 1].height) {
        animations.push([j, array[j + 1].height, true, false]);
        animations.push([j + 1, array[j].height, true, false]);
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
      animations.push([j, j + 1, false, true]);
    }
  }
  return animations;
};
