import { ArrayBar, SwapType } from "../App";

export const insertionSortHelper = (array: Array<ArrayBar>) => {
    const animations = [];
    for (let i = 1; i < array.length; i++) {
        let elementToInsert = array[i];
        let j;
        for (
            j = i;
            j > 0 && array[j - 1].height > elementToInsert.height;
            j--
        ) {
            animations.push([j - 1, j, SwapType.CHANGE_COLOR]);
            array[j] = array[j - 1];
            animations.push([j, array[j - 1].height, SwapType.COPY]);
            animations.push([j - 1, j, SwapType.RESET]);
        }
        animations.push([j, elementToInsert.height, SwapType.COPY]);
        array[j] = elementToInsert;
    }
    return animations;
};
