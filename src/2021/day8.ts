import { List, Map } from 'immutable';
import { sum } from '../util';

interface Signal {
  patterns: List<string>;
  output: List<string>;
}

export const parseLine = (input: string): Signal => {
  const [patternString, outputString] = input.split(' | ');
  return {
    patterns: List(patternString.split(' ')),
    output: List(outputString.split(' '))
      .map(s => [...s].sort()
        .join('')),
  };
};

export const parse = (input: string): List<Signal> => {
  return List(input.split('\n'))
    .filter(x => x.trim() !== '')
    .map(parseLine);
};

export const solve = (parsed: List<Signal>): number => {
  return parsed
    .map(x => x.output.filter(o => [2, 4, 3, 7].includes(o.length)).size)
    .reduce(sum, 0);
};

const minus = (a: string, b: string): string =>
  [...a].filter(c => !b.includes(c))
    .join('');

const digitsWithSegmentCount = (signal: Signal, count: number): List<string> => {
  return signal.patterns.filter(pattern => pattern.length === count)
    .map(x => [...x!].sort()
      .join(''))
    .toSet()
    .toList();
};

const calculateSignalMap = (signal: Signal): Map<string, number> => {
  const one = digitsWithSegmentCount(signal, 2)
    .get(0)!;
  const four = digitsWithSegmentCount(signal, 4)
    .get(0)!;
  const seven = digitsWithSegmentCount(signal, 3)
    .get(0)!;
  const eight = digitsWithSegmentCount(signal, 7)
    .get(0)!;


  const segment36 = one;
  const segment24 = minus(four, one);
  const segment1 = minus(seven, one);
  const segment57 = minus(minus(minus(eight, segment36), segment24), segment1);

  const segment5s = digitsWithSegmentCount(signal, 5);
  const three = segment5s.filter(item => [...segment36].every(d => item.includes(d)))
    .get(0)!;
  const segment5 = minus(segment57, three);
  const segment6s = digitsWithSegmentCount(signal, 6);
  const six = segment6s.filter(item => ![...one].every(d => item.includes(d)))
    .get(0)!;
  const segment2 = minus(segment24, three);
  const segment4 = minus(segment24, segment2);
  const segment3 = minus(three, six);
  const segment6 = minus(segment36, segment3);

  const two = minus(minus(eight, segment2), segment6);
  const five = minus(minus(eight, segment3), segment5);

  const nine = minus(eight, segment5);
  const zero = minus(eight, segment4);

  return Map({
    [one]: 1,
    [two]: 2,
    [three]: 3,
    [four]: 4,
    [five]: 5,
    [six]: 6,
    [seven]: 7,
    [eight]: 8,
    [nine]: 9,
    [zero]: 0,
  });
};

export const solveB = (parsed: List<Signal>): number => {
  return parsed.map(signal => {
    const signalMap = calculateSignalMap(signal);
    return parseInt(signal.output.map(output => signalMap.get(output))
      .join(''), 10);
  })
    .reduce(sum, 0);
};

export const day8a = (input: string): number => {
  const parsed = parse(input);
  const solved = solve(parsed);
  console.log(`Solution: ${solved}`);
  return solved;
};

export const day8b = (input: string): number => {
  const parsed = parse(input);
  const solved = solveB(parsed);
  console.log(`Solution: ${solved}`);
  return solved;
};
