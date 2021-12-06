import { parseNumbers } from '../util';

export const parse = (input: string): number[] => {
  return parseNumbers(input);
};

export const solve = (parsed: number[], generations: number): number => {
  let fishesMap = parsed.reduce((agg, curr) => {
    agg[curr] += 1;
    return agg;
  }, [0, 0, 0, 0, 0, 0, 0, 0, 0]);
  for (let i = 0; i < generations; i++) {
    fishesMap = [
      fishesMap[1], // 0
      fishesMap[2], // 1
      fishesMap[3], // 2
      fishesMap[4], // 3
      fishesMap[5], // 4
      fishesMap[6], // 5
      fishesMap[7] + fishesMap[0], // 6
      fishesMap[8], // 7
      fishesMap[0], // 8
    ];
  }
  return fishesMap.reduce((sum, curr) => sum + curr, 0);
};

export const day6a = (input: string): number => {
  const parsed = parse(input);
  const solved = solve(parsed, 80);
  console.log(`Solution: ${solved}`);
  return solved;
};

export const day6b = (input: string): number => {
  const parsed = parse(input);
  const solved = solve(parsed, 256);
  console.log(`Solution: ${solved}`);
  return solved;
};
