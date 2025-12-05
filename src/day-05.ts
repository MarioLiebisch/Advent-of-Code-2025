const example: string = "data/example-05.txt";
const input: string = "data/input-05.txt";

import fs from "fs";

const solve_1 = (file: string): number => {
  let count = 0;
  const ranges: number[][] = [];
  const input = fs.readFileSync(file, "utf-8").trim().split("\n");
  let in_ranges = true;
  input.forEach((line) => {
    if (line === "") {
      in_ranges = false;
      return;
    }

    if (in_ranges) {
      const [start, end] = line.split("-").map(Number);
      ranges.push([start, end]);
    } else {
      const num = Number(line);
      for (const range of ranges) {
        if (num >= range[0] && num <= range[1]) {
          count++;
          break;
        }
      }
    }
  });
  return count;
};

const solve_2 = (file: string): number => {
  const ranges: number[][] = [];
  const input = fs.readFileSync(file, "utf-8").trim().split("\n");
  let in_ranges = true;
  input.forEach((line) => {
    if (!in_ranges) {
      return;
    }
    if (line === "") {
      in_ranges = false;
      return;
    }

    const [start, end] = line.split("-").map(Number);

    ranges.push([start, end]);
  });

  ranges.sort((a, b) => a[0] - b[0]);

  const merged_ranges: number[][] = [];
  let current_range = ranges[0];

  for (let i = 1; i < ranges.length; i++) {
    const range = ranges[i];
    if (range[0] <= current_range[1] + 1) {
      // Overlapping with current range
      current_range[1] = Math.max(current_range[1], range[1]);
    } else {
      // Not overlapping, start a new range
      merged_ranges.push(current_range);
      current_range = range;
    }
  }
  merged_ranges.push(current_range);

  let count = 0;
  for (const range of merged_ranges) {
    count += range[1] - range[0] + 1;
  }

  return count;
};

export const main = (): void => {
  console.log("Example 1:", solve_1(example));
  console.log("Solution 1:", solve_1(input));
  console.log("Example 2:", solve_2(example));
  console.log("Solution 2:", solve_2(input));
};
