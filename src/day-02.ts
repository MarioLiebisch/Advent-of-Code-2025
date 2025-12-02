const example: string = "data/example-02.txt";
const input: string = "data/input-02.txt";

import fs from "fs";

const solve_1 = (file: string): number => {
  let sum: number = 0;
  const ranges: number[][] = fs
    .readFileSync(file, "utf-8")
    .trim()
    .split(",")
    .map((entry) => entry.split("-").map(Number));
  for (const [start, end] of ranges) {
    for (let i = start; i <= end; i++) {
      const str = i.toString();
      const length = str.length;
      if (length % 2 === 1) {
        continue;
      }
      if (str.slice(0, length / 2) === str.slice(length / 2)) {
        sum += i;
      }
    }
  }
  return sum;
};

const s2rx: RegExp = /^(\d+)\1+$/;

const solve_2 = (file: string): number => {
  let sum: number = 0;
  const ranges: number[][] = fs
    .readFileSync(file, "utf-8")
    .trim()
    .split(",")
    .map((entry) => entry.split("-").map(Number));
  for (const [start, end] of ranges) {
    for (let i = start; i <= end; i++) {
      if (s2rx.test(i.toString())) {
        sum += i;
      }
    }
  }
  return sum;
};

export const main = (): void => {
  console.log("Example 1:", solve_1(example));
  console.log("Solution 1:", solve_1(input));
  console.log("Example 2:", solve_2(example));
  console.log("Solution 2:", solve_2(input));
};
