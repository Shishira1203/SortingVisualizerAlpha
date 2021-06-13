import { ArrayBar } from "../App";

const partition = (
  array: Array<ArrayBar>,
  start: number,
  end: number,
  animations: Array<any>
) => {
  let i = start,
    j = end;
  let piv = array[start];
  while (i < j) {
    while (i < j && array[--j].height >= piv.height) {
      animations.push([i, j, false, false]);
      animations.push([i, j, false, true]);
    }
    if (i < j) {
      animations.push([i, array[j].height, true, false]);
      array[i] = array[j];
    }
    while (i < j && array[++i].height <= piv.height) {
      animations.push([i, j, false, false]);
      animations.push([i, j, false, true]);
    }
    if (i < j) {
      animations.push([j, array[i].height, true, false]);
      array[j] = array[i];
    }
  }
  animations.push([j, piv.height, true, false]);
  array[j] = piv;
  return j;
};

export const quickSortHelper = (
  array: Array<ArrayBar>,
  start: number,
  end: number,
  animations: Array<any>
) => {
  if (end - start < 2) return;
  const pivot = partition(array, start, end, animations);
  quickSortHelper(array, start, pivot, animations);
  quickSortHelper(array, pivot + 1, end, animations);
};
