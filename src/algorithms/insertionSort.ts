import { ArrayBar } from "../App";

export const insertionSortHelper = (array: Array<ArrayBar>) => {
  const animations = [];
  for (let i = 1; i < array.length; i++) {
    let elementToInsert = array[i];
    let j;
    for (j = i; j > 0 && array[j - 1].height > elementToInsert.height; j--) {
      animations.push([j - 1, j, false, false]);
      array[j] = array[j - 1];
      animations.push([j, array[j - 1].height, true, false]);
      animations.push([j - 1, j, false, true]);
    }
    animations.push([j, elementToInsert.height, true, false]);
    array[j] = elementToInsert;
  }
  return animations;
};
