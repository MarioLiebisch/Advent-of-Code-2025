const example: string = "data/example-08.txt";
const input: string = "data/input-08.txt";

import fs from "fs";

const solve_1 = (file: string, connections: number): number => {
  const boxes = fs
    .readFileSync(file, "utf-8")
    .trim()
    .split("\n")
    .map((line) => {
      const data = line.split(",").map(Number);
      data.length = 4;
      data[3] = -1;
      return data;
    });
  let next_circuit = 0;

  const shortest_connections: number[][] = [];
  for (let a = 0; a < boxes.length - 1; a++) {
    for (let b = a + 1; b < boxes.length; b++) {
      const dx = boxes[a][0] - boxes[b][0];
      const dy = boxes[a][1] - boxes[b][1];
      const dz = boxes[a][2] - boxes[b][2];
      const dist = dx * dx + dy * dy + dz * dz;
      shortest_connections.push([a, b, dist]);
    }
  }
  shortest_connections.sort((a, b) => a[2] - b[2]);

  const circuit_sizes: Record<number, number> = {};
  for (
    let connections_made = 0;
    connections_made < connections;
    connections_made++
  ) {
    const [a, b] = shortest_connections.shift()!;
    const circuit_a = boxes[a][3];
    const circuit_b = boxes[b][3];

    if (circuit_a !== -1 && circuit_a === circuit_b) {
      continue;
    }

    if (circuit_a === -1 && circuit_b === -1) {
      boxes[a][3] = next_circuit;
      boxes[b][3] = next_circuit;
      circuit_sizes[next_circuit] = 2;
      next_circuit++;
    } else if (circuit_b === -1) {
      boxes[b][3] = circuit_a;
      circuit_sizes[circuit_a]++;
    } else if (circuit_a === -1) {
      boxes[a][3] = circuit_b;
      circuit_sizes[circuit_b]++;
    } else {
      circuit_sizes[circuit_a] += circuit_sizes[circuit_b];
      delete circuit_sizes[circuit_b];
      for (let j = 0; j < boxes.length; j++) {
        if (boxes[j][3] === circuit_b) {
          boxes[j][3] = circuit_a;
        }
      }
    }
  }

  const entries = Object.entries(circuit_sizes);
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][1] * entries[1][1] * entries[2][1];
};

const solve_2 = (file: string): number => {
  const boxes = fs
    .readFileSync(file, "utf-8")
    .trim()
    .split("\n")
    .map((line) => {
      const data = line.split(",").map(Number);
      data.length = 4;
      data[3] = -1;
      return data;
    });
  let next_circuit = 0;

  const shortest_connections: number[][] = [];
  for (let a = 0; a < boxes.length - 1; a++) {
    for (let b = a + 1; b < boxes.length; b++) {
      const dx = boxes[a][0] - boxes[b][0];
      const dy = boxes[a][1] - boxes[b][1];
      const dz = boxes[a][2] - boxes[b][2];
      const dist = dx * dx + dy * dy + dz * dz;
      shortest_connections.push([a, b, dist]);
    }
  }
  shortest_connections.sort((a, b) => a[2] - b[2]);

  const circuit_sizes: Record<number, number> = {
    [-1]: boxes.length,
  };
  for (; shortest_connections.length > 0; ) {
    const [a, b] = shortest_connections.shift()!;
    const circuit_a = boxes[a][3];
    const circuit_b = boxes[b][3];

    if (circuit_a !== -1 && circuit_a === circuit_b) {
      continue;
    }

    if (circuit_a === -1 && circuit_b === -1) {
      boxes[a][3] = next_circuit;
      boxes[b][3] = next_circuit;
      circuit_sizes[next_circuit] = 2;
      circuit_sizes[-1] -= 2;
      next_circuit++;
    } else if (circuit_b === -1) {
      boxes[b][3] = circuit_a;
      circuit_sizes[circuit_a]++;
      circuit_sizes[-1]--;
    } else if (circuit_a === -1) {
      boxes[a][3] = circuit_b;
      circuit_sizes[circuit_b]++;
      circuit_sizes[-1]--;
    } else {
      circuit_sizes[circuit_a] += circuit_sizes[circuit_b];
      delete circuit_sizes[circuit_b];
      for (let j = 0; j < boxes.length; j++) {
        if (boxes[j][3] === circuit_b) {
          boxes[j][3] = circuit_a;
        }
      }
    }
    if (circuit_sizes[-1] === 0) {
      return boxes[a][0] * boxes[b][0];
    }
  }
  return 0; // Should never happen
};

export const main = (): void => {
  console.log("Example 1:", solve_1(example, 10));
  console.log("Solution 1:", solve_1(input, 1000));
  console.log("Example 2:", solve_2(example));
  console.log("Solution 2:", solve_2(input));
};
