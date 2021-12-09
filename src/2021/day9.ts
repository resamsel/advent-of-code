import { List } from 'immutable';
import { numericDesc, parseNumbers, product } from '../util';

export const parse = (input: string): List<List<number>> => {
  return List(input.split('\n')
    .filter(x => x.trim() !== '')
    .map(line => List(parseNumbers(line, ''))));
};

const get = (values: List<List<number>>, row: number, col: number): number | undefined => {
  if (row < 0 || row >= values.size || col < 0 || col >= values.get(row)!.size) {
    return undefined;
  }
  return values.get(row)
    ?.get(col);
};

const getCandidates = (input: List<List<number>>, row: number, col: number): List<[number, number]> => {
  return List([
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ]);
};

const isLowPoint = (values: List<List<number>>, row: number, col: number): boolean => {
  const value = get(values, row, col)!;
  return getCandidates(values, row, col)
    .map(([r, c]) => get(values, r, c))
    .filter(x => x !== undefined)
    .every(v => v! > value);
};

export const solve = (parsed: List<List<number>>): number => {
  return parsed.reduce((agg, row, rowIndex) => {
    return agg + row.reduce((rowSum, value, colIndex) => {
      if (isLowPoint(parsed, rowIndex, colIndex)) {
        return rowSum + value + 1;
      }
      return rowSum;
    }, 0);
  }, 0);
};

const extendBasin = (input: List<List<number>>, basin: [number, number][], row: number, col: number): boolean => {
  return getCandidates(input, row, col)
    .map(([r, c]) => {
      const v = get(input, r, c);
      if (v !== undefined && v !== 9 && basin.find(([r1, c1]) => r1 === r && c1 === c) === undefined) {
        basin.push([r, c]);
        return true;
      }

      return false;
    })
    .filter(Boolean)
    .size > 0;
};

/**
 * Not using immutable.js for basin on purpose, as the side-effect on basin is needed here.
 */
const basinSize = (input: List<List<number>>, basin: [number, number][]): number => {
  // extend basin
  while (basin.map(([row, col]) => extendBasin(input, basin, row, col))
    .filter(Boolean).length > 0) {
  }
  return basin.length;
};

export const solveB = (parsed: List<List<number>>): number => {
  // Find all basins
  const basins = parsed.reduce((agg, row, rowIndex) => {
    return [...agg, ...row.reduce((rowAgg, value, colIndex) => {
      if (isLowPoint(parsed, rowIndex, colIndex)) {
        return [...rowAgg, basinSize(parsed, [[rowIndex, colIndex]])];
      }
      return rowAgg;
    }, [] as number[])];
  }, [] as number[]);

  // Take three biggest basins and multiply their values
  return basins.sort(numericDesc)
    .slice(0, 3)
    .reduce(product, 1);
};

export const day9a = (input: string): number => {
  const parsed = parse(input);
  const solved = solve(parsed);
  console.log(`Solution: ${solved}`);
  return solved;
};

export const day9b = (input: string): number => {
  const parsed = parse(input);
  const solved = solveB(parsed);
  console.log(`Solution: ${solved}`);
  return solved;
};
