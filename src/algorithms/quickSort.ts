import { ArrayBar, SwapType } from "../App";

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
      animations.push([i, j, SwapType.CHANGE_COLOR]);
      animations.push([i, j, SwapType.RESET]);
    }
    if (i < j) {
      animations.push([i, array[j].height,SwapType.COPY]);
      array[i] = array[j];
    }
    while (i < j && array[++i].height <= piv.height) {
      animations.push([i, j, SwapType.CHANGE_COLOR]);
      animations.push([i, j, SwapType.RESET]);
    }
    if (i < j) {
      animations.push([j, array[i].height,SwapType.COPY]);
      array[j] = array[i];
    }
  }
  animations.push([j, piv.height,SwapType.COPY]);
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
