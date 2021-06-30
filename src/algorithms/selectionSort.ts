import { ArrayBar, SwapType } from "../App";

export const selectionSortHelper = (array: Array<ArrayBar>) => {
    const animations: Array<any> = [];
    for (let i = 0; i < array.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            animations.push([j, minIdx, SwapType.CHANGE_COLOR]);
            if (array[j].height < array[minIdx].height) minIdx = j;
            animations.push([j, minIdx, SwapType.RESET]);
        }
        animations.push([i, minIdx, SwapType.RESET]);
        let temp = array[minIdx];
        animations.push([minIdx, i, SwapType.SWAP]);
        array[minIdx] = array[i];
        array[i] = temp;
    }
    return animations;
};
