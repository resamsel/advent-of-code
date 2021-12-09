import { List } from 'immutable';
import { numericAsc, parseNumbers, sum } from '../util';

export const parse = (input: string): List<number> => {
  return List(parseNumbers(input));
};

export const summedCost = (distance: number): number => {
  if (distance === 0) {
    return 0;
  }
  return distance + summedCost(distance - 1);
};

export const aggregateCost = (input: List<number>, target: number, cost: (distance: number) => number): number => {
  return input.reduce((sum, curr) => sum + cost(Math.abs(curr - target)), 0);
};

export const solve = (parsed: List<number>): number => {
  const median = parsed.sort(numericAsc)
    .get(Math.floor(parsed.size / 2))!;
  return aggregateCost(parsed, median, x => x);
};

export const solveB = (parsed: List<number>): number => {
  const avg = parsed.reduce(sum, 0) / parsed.size;
  return Math.min(
    aggregateCost(parsed, Math.floor(avg), summedCost),
    aggregateCost(parsed, Math.ceil(avg), summedCost),
  );
};

export const day7a = (input: string): number => {
  const parsed = parse(input);
  const solved = solve(parsed);
  console.log(`Solution: ${solved}`);
  return solved;
};

export const day7b = (input: string): number => {
  const parsed = parse(input);
  const solved = solveB(parsed);
  console.log(`Solution: ${solved}`);
  return solved;
};
