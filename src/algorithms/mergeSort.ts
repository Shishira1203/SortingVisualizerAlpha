import { ArrayBar, SwapType } from "../App";

const doMerge = (
  array: Array<ArrayBar>,
  start: number,
  mid: number,
  end: number,
  tempArray: Array<ArrayBar>,
  animations: Array<any>
) => {
  let k = start;
  let i = start;
  let j = mid + 1;
  while (i <= mid && j <= end) {
    animations.push([i, j, SwapType.CHANGE_COLOR]);
    animations.push([i, j, SwapType.RESET]);
    if (tempArray[i].height <= tempArray[j].height) {
      animations.push([k, i, SwapType.CHANGE_COLOR]);
      animations.push([k, tempArray[i].height, SwapType.COPY]);
      animations.push([k, i, SwapType.RESET]);
      array[k++] = tempArray[i++];
    } else {
      animations.push([k, i, SwapType.CHANGE_COLOR]);
      animations.push([k, tempArray[j].height, SwapType.COPY]);
      animations.push([k, i, SwapType.RESET]);
      array[k++] = tempArray[j++];
    }
  }
  while (i <= mid) {
    animations.push([k, i, SwapType.CHANGE_COLOR]);
    animations.push([k, tempArray[i].height, SwapType.COPY]);
    animations.push([k, i, SwapType.RESET]);
    array[k++] = tempArray[i++];
  }
  while (j <= end) {
    animations.push([k, j, SwapType.CHANGE_COLOR]);
    animations.push([k, tempArray[j].height, SwapType.COPY]);
    animations.push([k, j, SwapType.RESET]);
    array[k++] = tempArray[j++];
  }
};

export const mergeSortHelper = (
  array: Array<ArrayBar>,
  start: number,
  end: number,
  tempArray: Array<ArrayBar>,
  animations: Array<any>
) => {
  if (start === end) return;
  const mid = Math.floor((start + end) / 2);
  mergeSortHelper(tempArray, start, mid, array, animations);
  mergeSortHelper(tempArray, mid + 1, end, array, animations);
  doMerge(array, start, mid, end, tempArray, animations);
};
