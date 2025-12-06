const example: string = "data/example-06.txt";
const input: string = "data/input-06.txt";

import fs from "fs";

const solve_1 = (file: string): number => {
  let sum = 0;
  const lines = fs.readFileSync(file, "utf-8").split("\n");
  const rows: number[][] = [];
  const ops: boolean[] = [];
  for (const line of lines) {
    if (line[0] === "*" || line[0] === "+") {
      ops.push(
        ...line
          .split(" ")
          .filter((x) => x !== "")
          .map((c) => c === "*"),
      );
      break;
    } else {
      rows.push(
        line
          .split(" ")
          .filter((x) => x !== "")
          .map((c) => parseInt(c, 10)),
      );
    }
  }
  const length = rows[0].length;
  for (let col = 0; col < length; col++) {
    switch (ops[col]) {
      case true: {
        let prod = 1;
        for (const row of rows) {
          prod *= row[col];
        }
        sum += prod;
        break;
      }
      case false: {
        let colSum = 0;
        for (const row of rows) {
          colSum += row[col];
        }
        sum += colSum;
        break;
      }
    }
  }
  return sum;
};

const solve_2 = (file: string): number => {
  let sum = 0;
  const lines = fs
    .readFileSync(file, "utf-8")
    .split("\n")
    .filter((line) => line.length > 0);

  let current = 0;
  const height = lines.length - 1;
  const zero = "0".charCodeAt(0);

  const maxLength = lines.reduce((max, line) => Math.max(max, line.length), 0);
  for (let j = 0; j < height; j++) {
    if (lines[j].length < maxLength) {
      lines[j] = lines[j] + " ".repeat(maxLength - lines[j].length);
    }
  }

  while (current !== -1) {
    const next1 = lines[lines.length - 1].indexOf("*", current + 1);
    const next2 = lines[lines.length - 1].indexOf("+", current + 1);
    const next =
      next1 === -1 ? next2 : next2 === -1 ? next1 : Math.min(next1, next2);
    const width = next === -1 ? maxLength - current : next - current - 1;

    const numbers: number[] = [];
    numbers.length = width;
    for (let i = 0; i < width; i++) {
      numbers[i] = 0;
      for (let j = 0; j < height; j++) {
        if (lines[j][current + i] === " ") continue;
        numbers[i] =
          numbers[i] * 10 + (lines[j].charCodeAt(current + i) - zero);
      }
    }
    if (lines[lines.length - 1][current] === "*") {
      let prod = 1;
      for (let i = 0; i < width; i++) {
        prod *= numbers[i];
      }
      sum += prod;
    } else {
      for (const n of numbers) {
        sum += n;
      }
    }
    current = next;
  }
  return sum;
};

export const main = (): void => {
  console.log("Example 1:", solve_1(example));
  console.log("Solution 1:", solve_1(input));
  console.log("Example 2:", solve_2(example));
  console.log("Solution 2:", solve_2(input));
};
