const example: string = "data/example-01.txt";
const input: string = "data/input-01.txt";

import fs from "fs";

class Lock {
  private position: number = 50;
  private zeroStops: number = 0;
  private zeroClicks: number = 0;

  public turn(direction: "L" | "R", steps: number): void {
    if (steps == 0) {
      return;
    }

    const turns = Math.floor(steps / 100);
    steps -= turns * 100;

    this.zeroClicks += turns;

    if (direction === "L") {
      if (this.position < steps) {
        if (this.position !== 0) {
          this.zeroClicks++;
        }
        this.position = (this.position + 100 - steps) % 100;
      } else if (this.position === steps) {
        this.zeroStops++;
        this.zeroClicks++;
        this.position = 0;
      } else {
        this.position -= steps;
      }
    } else {
      if (this.position + steps > 100) {
        this.zeroClicks++;
        this.position = (this.position + steps) % 100;
      } else if (this.position + steps === 100) {
        this.zeroStops++;
        this.zeroClicks++;
        this.position = 0;
      } else {
        this.position += steps;
      }
    }
  }

  public getPosition(): number {
    return this.position;
  }

  public getZeroStops(): number {
    return this.zeroStops;
  }

  public getZeroClicks(): number {
    return this.zeroClicks;
  }
}

const solve_1 = (file: string): number => {
  const lines: string[] = fs
    .readFileSync(file, "utf-8")
    .split("\n")
    .filter((l) => l.length > 0);
  const lock: Lock = new Lock();

  for (const line of lines) {
    const direction = line[0];
    const stepsStr = line.slice(1);
    const steps: number = parseInt(stepsStr, 10);
    lock.turn(direction as "L" | "R", steps);
  }
  return lock.getZeroStops();
};

const solve_2 = (file: string): number => {
  const lines: string[] = fs
    .readFileSync(file, "utf-8")
    .split("\n")
    .filter((l) => l.length > 0);
  const lock: Lock = new Lock();

  for (const line of lines) {
    if (line.length < 2) {
      console.log('Broken: "' + line + '"');
      continue;
    }
    const direction = line[0];
    const stepsStr = line.slice(1);
    const steps: number = parseInt(stepsStr, 10);
    lock.turn(direction as "L" | "R", steps);
  }
  return lock.getZeroClicks();
};

export const main = (): void => {
  console.log("Example 1:", solve_1(example));
  console.log("Solution 1:", solve_1(input));
  console.log("Example 2:", solve_2(example));
  console.log("Solution 2:", solve_2(input));
};
