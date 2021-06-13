import { ArrayBar } from "../App";

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
    animations.push([i, j, false, false]);
    if (tempArray[i].height <= tempArray[j].height) {
      animations.push([i, j, false, true]);
      animations.push([k, tempArray[i].height, true, false]);
      array[k++] = tempArray[i++];
    } else {
      animations.push([i, j, false, true]);
      animations.push([k, tempArray[j].height, true, false]);
      array[k++] = tempArray[j++];
    }
  }
  while (i <= mid) {
    animations.push([k, k, false, false]);
    animations.push([k, tempArray[i].height, true, false]);
    animations.push([k, k, false, true]);
    array[k++] = tempArray[i++];
  }
  while (j <= end) {
    animations.push([k, k, false, false]);
    animations.push([k, tempArray[j].height, true, false]);
    animations.push([k, k, false, true]);
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
