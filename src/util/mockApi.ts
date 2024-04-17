import data from "../data";
import { DataStructure } from "../types/types";

function mockApiCall(): Promise<DataStructure> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
}

export default mockApiCall;
