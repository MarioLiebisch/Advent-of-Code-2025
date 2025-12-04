const example: string = "data/example-04.txt";
const input: string = "data/input-04.txt";

import fs from "fs";

const accessible = (grid: boolean[][], x: number, y: number): boolean => {
  const width = grid[0].length;
  const height = grid.length;
  let count = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      if (x + dx < 0 || x + dx >= width) continue;
      if (y + dy < 0 || y + dy >= height) continue;
      if (grid[y + dy][x + dx]) count++;
    }
  }
  return count < 4;
};

const solve_1 = (file: string): number => {
  const grid = fs
    .readFileSync(file, "utf-8")
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => line.split("").map((char) => char === "@"));
  const width = grid[0].length;
  const height = grid.length;

  let count = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y][x] && accessible(grid, x, y)) {
        count++;
      }
    }
  }
  return count;
};

const solve_2 = (file: string): number => {
  const grid = fs
    .readFileSync(file, "utf-8")
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => line.split("").map((char) => char === "@"));
  const width = grid[0].length;
  const height = grid.length;

  let count = 0;
  let moved = false;

  do {
    moved = false;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (grid[y][x] && accessible(grid, x, y)) {
          grid[y][x] = false;
          count++;
          moved = true;
        }
      }
    }
  } while (moved);
  return count;
};

export const main = (): void => {
  console.log("Example 1:", solve_1(example));
  console.log("Solution 1:", solve_1(input));
  console.log("Example 2:", solve_2(example));
  console.log("Solution 2:", solve_2(input));
};
