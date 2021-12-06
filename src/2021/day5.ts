import { parseNumbers } from '../util';

interface Coordinate {
  x: number;
  y: number;
}

interface Vent {
  start: Coordinate;
  end: Coordinate;
}

export const parseVent = (input: string): Vent => {
  const [start, end] = input.split(' -> ')
    .map(coordinate => {
      const [x, y] = parseNumbers(coordinate);
      return {x, y};
    });
  return {start, end};
};

export const parse = (input: string): Vent[] => {
  return input.split('\n')
    .filter(x => x.trim() !== '')
    .map(line => parseVent(line));
};

const isHorizontalOrVertical = (vent: Vent): boolean => vent.start.x === vent.end.x || vent.start.y === vent.end.y;

const addVent = (diagram: number[][], vent: Vent): number[][] => {
  const stepX = vent.start.x === vent.end.x ? 0 : (vent.start.x < vent.end.x ? 1 : -1);
  const stepY = vent.start.y === vent.end.y ? 0 : (vent.start.y < vent.end.y ? 1 : -1);
  const delta = Math.abs(stepX !== 0 ? (vent.start.x - vent.end.x) : (vent.start.y - vent.end.y));
  for (let i = 0; i <= delta; i++) {
    const x = vent.start.x + stepX * i;
    const y = vent.start.y + stepY * i;
    if (diagram[y] === undefined) {
      diagram[y] = [];
    }
    if (diagram[y][x] === undefined) {
      diagram[y][x] = 0;
    }
    diagram[y][x] += 1;
  }
  return diagram;
};

export const solve = (parsed: Vent[]): number => {
  return parsed
    .filter(isHorizontalOrVertical)
    .reduce(addVent, [])
    .reduce((agg, curr) => agg + curr.filter(x => x > 1).length, 0);
};

export const solveB = (parsed: Vent[]): number => {
  return parsed
    .reduce(addVent, [])
    .reduce((agg, curr) => agg + curr.filter(x => x > 1).length, 0);
};

export const day5a = (input: string): number => {
  const parsed = parse(input);
  const solved = solve(parsed);
  console.log(`Solution: ${solved}`);
  return solved;
};

export const day5b = (input: string): number => {
  const parsed = parse(input);
  const solved = solveB(parsed);
  console.log(`Solution: ${solved}`);
  return solved;
};
