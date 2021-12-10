import { nonUndefined, parseNumbers } from '../util';

export const parse = (input: string): number[] => {
  return parseNumbers(input);
};

const solve = (input: number[], iterations: number): number => {
  // consume input numbers
  const map: Record<number, number[]> = input.reduce((agg, curr, index) => ({
    ...agg,
    [curr]: [index + 1],
  }), {});
  let lastNumberSpoken = input[input.length - 1];

  let numberSpoken: number;
  for (let turn = input.length + 1; turn <= iterations; turn++) {
    if (map[lastNumberSpoken].length === 1) {
      numberSpoken = 0;
    } else {
      numberSpoken = map[lastNumberSpoken][0] - map[lastNumberSpoken][1];
    }

    map[numberSpoken] = [turn, (map[numberSpoken] ?? [])[0]].filter(nonUndefined);
    lastNumberSpoken = numberSpoken;
  }
  return lastNumberSpoken;
};

export const day15a = (input: string): number => {
  const parsed = parse(input);
  const solved = solve(parsed, 2020);
  console.log(`Solution: ${solved}`);
  return solved;
};

export const day15b = (input: string): number => {
  const parsed = parse(input);
  const solved = solve(parsed, 30000000);
  console.log(`Solution: ${solved}`);
  return solved;
};
