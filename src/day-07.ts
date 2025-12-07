const example: string = "data/example-07.txt";
const input: string = "data/input-07.txt";

import fs from "fs";

const tachyon_tree = (file: string): [number, number] => {
  let splits = 0;
  const map = fs
    .readFileSync(file, "utf-8")
    .split("\n")
    .filter((line) => line.length > 0);
  const width = map[0].length;
  const start = map[0].indexOf("S");
  let beams: Record<number, number> = { [start]: 1 };
  for (let i = 1; i < map.length - 1; i++) {
    const newBeams: Record<number, number> = {};
    for (const _pos of Object.keys(beams)) {
      const pos = Number(_pos);
      const count = beams[pos];
      switch (map[i][pos]) {
        case ".":
          newBeams[pos] = (newBeams[pos] ?? 0) + count;
          break;
        case "^":
          if (pos > 0 && map[i][pos - 1] === ".") {
            newBeams[pos - 1] = (newBeams[pos - 1] ?? 0) + count;
          }
          if (pos < width && map[i][pos + 1] === ".") {
            newBeams[pos + 1] = (newBeams[pos + 1] ?? 0) + count;
          }
          splits++;
          break;
      }
    }
    beams = newBeams;
  }
  return [splits, Object.values(beams).reduce((a, b) => a + b, 0)];
};

const solve_1 = (file: string): number => {
  return tachyon_tree(file)[0];
};

const solve_2 = (file: string): number => {
  return tachyon_tree(file)[1];
};

export const main = (): void => {
  console.log("Example 1:", solve_1(example));
  console.log("Solution 1:", solve_1(input));
  console.log("Example 2:", solve_2(example));
  console.log("Solution 2:", solve_2(input));
};
