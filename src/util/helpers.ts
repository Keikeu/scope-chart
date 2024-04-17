import { Activity } from "../types/types";

export function getSumOfNumbersInNestedArray(arr: Activity[] | Activity[][]): number {
  const flattenedArray = arr.flat(10);
  const numberElements = flattenedArray.filter((el): el is number => typeof el === "number");

  return numberElements.reduce((partialSum, el) => partialSum + el, 0);
}
