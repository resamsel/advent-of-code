import { countOccurrences, transpose } from '../util';

export const parse = (input: string): number[][] => {
  return input
    .split('\n')
    .filter(x => x.trim() !== '')
    .map(x => [...x].map(x => parseInt(x, 10)));
};

export const solve = (parsed: number[][]): number => {
  const gamma = parseInt(transpose(parsed)
    .map(x => countOccurrences(x, 0) > countOccurrences(x, 1) ? 0 : 1)
    .join(''), 2);
  const epsilon = parseInt(transpose(parsed)
    .map(x => countOccurrences(x, 0) > countOccurrences(x, 1) ? 1 : 0)
    .join(''), 2);
  console.log(`Gamma: ${gamma}, Epsilon: ${epsilon}`);
  return gamma * epsilon;
};

const oxygenGeneratorRating = (input: number[][]): number => {
  const reduced = input.reduce((filtered, curr, i) => {
    if (filtered.length === 1) {
      return filtered;
    }
    const bits = transpose(filtered)[i];
    const newFilter = countOccurrences(bits, 0) > countOccurrences(bits, 1) ? 0 : 1;
    return filtered.filter(x => x[i] === newFilter);
  }, input);

  return parseInt(reduced[0].join(''), 2);
};

const co2ScrubberRating = (input: number[][]): number => {
  const reduced = input.reduce((filtered, curr, i) => {
    if (filtered.length === 1) {
      return filtered;
    }
    const bits = transpose(filtered)[i];
    const newFilter = countOccurrences(bits, 0) > countOccurrences(bits, 1) ? 1 : 0;
    return filtered.filter(x => x[i] === newFilter);
  }, input);

  return parseInt(reduced[0].join(''), 2);
};

export const solveB = (parsed: number[][]): number => {
  const ogr = oxygenGeneratorRating(parsed);
  const csr = co2ScrubberRating(parsed);

  console.log(`OGR: ${ogr}, CSR: ${csr}`);

  return ogr * csr;
};

export const day3a = (input: string): number => {
  const parsed = parse(input);
  const solved = solve(parsed);
  console.log(`Solution: ${solved}`);
  return solved;
};

export const day3b = (input: string): number => {
  const parsed = parse(input);
  const solved = solveB(parsed);
  console.log(`Solution: ${solved}`);
  return solved;
};
