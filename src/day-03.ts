const example: string = "data/example-03.txt";
const input: string = "data/input-03.txt";

import fs from "fs";

const solve_1 = (file: string): number => {
  let sum = 0;
  const banks = fs
    .readFileSync(file, "utf-8")
    .split("\n")
    .filter((length) => length)
    .map((line) => line.split("").map((num) => parseInt(num, 10)));
  for (const bank of banks) {
    let largest_joltage = 0;
    for (let i = 0; i < bank.length - 1; i++) {
      for (let j = i + 1; j < bank.length; j++) {
        const joltage = bank[i] * 10 + bank[j];
        if (joltage > largest_joltage) {
          largest_joltage = joltage;
        }
      }
    }
    sum += largest_joltage;
  }
  return sum;
};

const find_max_joltage = (
  bank: number[],
  offset: number,
  length: number,
): number => {
  let max_joltage = 0;
  let max_digit = 0;

  // Find the largest remaining digit within valid ranges and only check those
  for (let i = offset; i < bank.length - length + 1; i++) {
    if (bank[i] < max_digit) continue;
    max_digit = bank[i];
  }

  for (let i = offset; i < bank.length - length + 1; i++) {
    if (bank[i] != max_digit) continue;
    max_digit = bank[i];

    const joltage =
      length > 1
        ? bank[i] * Math.pow(10, length - 1) +
          find_max_joltage(bank, i + 1, length - 1)
        : bank[i];
    if (joltage > max_joltage) {
      max_joltage = joltage;
    }
  }
  return max_joltage;
};

const solve_2 = (file: string): number => {
  let sum = 0;
  const banks = fs
    .readFileSync(file, "utf-8")
    .split("\n")
    .filter((length) => length)
    .map((line) => line.split("").map((num) => parseInt(num, 10)));
  let i = 0;
  for (const bank of banks) {
    const joltage = find_max_joltage(bank, 0, 12);
    sum += joltage;
    console.log(`Bank ${++i}: ${joltage}`);
  }
  return sum;
};

export const main = (): void => {
  console.log("Example 1:", solve_1(example));
  console.log("Solution 1:", solve_1(input));
  console.log("Example 2:", solve_2(example));
  console.log("Solution 2:", solve_2(input));
};
