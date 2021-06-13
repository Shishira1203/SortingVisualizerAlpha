import { ArrayBar } from "../App";

export const selectionSortHelper = (array: Array<ArrayBar>) => {
  const animations: Array<any> = [];
  for (let i = 0; i < array.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < array.length; j++) {
      animations.push([j, minIdx, false, false]);
      if (array[j].height < array[minIdx].height) minIdx = j;
      animations.push([j, minIdx, false, true]);
    }
    animations.push([i, minIdx, false, true]);
    let temp = array[minIdx];
    animations.push([minIdx, array[i].height, true, false]);
    array[minIdx] = array[i];
    animations.push([i, temp.height, true, false]);
    array[i] = temp;
  }
  return animations;
};
