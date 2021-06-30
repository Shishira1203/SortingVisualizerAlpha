import { ArrayBar, SwapType } from "../App";

export const countingSortHelper = (
    array: Array<ArrayBar>,
    min: number,
    max: number,
    animations: Array<any>,
) => {
    let countArray = [];
    for (let i = min; i <= max; i++) {
        countArray[i] = 0;
    }
    for (let i = 0; i < array.length; i++) {
        countArray[array[i].height]++;
        animations.push([i, i, SwapType.CHANGE_COLOR]);
        animations.push([i, i, SwapType.RESET]);
    }
    for (let i = min, j = 0; i <= max; i++) {
        while (countArray[i] > 0) {
            animations.push([j, i, SwapType.COPY]);
            j++;
            countArray[i]--;
        }
    }
};
