import { promises } from 'fs';
import { arrayEquals, numericAsc } from '../util';

const parse = (data: string): number[] =>
  data.split('\n')
    .filter(line => line.trim().length > 0)
    .map(line => parseInt(line, 10))
    .sort(numericAsc);

const differences = (input: number[]): number[] =>
  input.sort(numericAsc)
    .map((value, index, array) => index === 0 ? 0 : value - array[index - 1])
    .filter(diff => diff !== 0);

const differencesMap = (input: number[]): Record<number, number> => differences(input)
  .reduce((agg, curr) => ({...agg, [curr]: agg[curr] + 1}), {1: 0, 2: 0, 3: 1} as Record<number, number>);

const countRecursively = (input: number[], output: number[][]): number => {
  if (input.length === 0) {
    return output.length;
  }

  if (output.find(out => arrayEquals(out, input)) !== undefined) {
    // Do woa i schon
    return output.length;
  }

  // Do muass i noch hin!
  output.push(input);

  input.forEach((value, index) => {
    if (index < 1 || index >= input.length) {
      return;
    }

    const previousValue = input[index - 1];
    const nextValue = input[index + 1];
    if (nextValue - previousValue <= 3) {
      countRecursively([...input.slice(0, index), ...input.slice(index + 1)], output);
    }
  });

  return output.length;
};

const countImproved = (input: number[]): number => {
  return differences(input)
    .reduce((agg, curr, index) => {
      if (curr !== 3) {
        return agg;
      }

      const start = agg.start;
      const end = index + 1;
      const count = countRecursively(input.slice(start, end), []);
      console.log(`Divide: ${start}-${end}: ${count}`);

      return {start: index + 1, count: agg.count * count};
    }, {start: 0, count: 1})
    .count;
};

const sample = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

const solve = (parsed: number[]): void => {
  const input = [0, ...parsed, parsed[parsed.length - 1] + 3];
  console.log(`Sample: ${input}`);
  console.log(`Differences: ${differences(input)}`);
  const diffs = differencesMap(input);
  console.log(`Differences agg: ${diffs[1]} 1s, ${diffs[3]} 3s`);
  // const countRec = countRecursively(input, [])
  // console.log(`${new Date()}`)
  // console.log(`${new Date()}: Combinations rec: ${countRec} (${countRec.toString(2)})`)
  const count = countImproved(input);
  console.log(`${new Date()}: Combinations impr: ${count} (${count.toString(2)})`);
};

try {
  const parsed = parse(sample);
  solve(parsed);
} catch (e) {
}

export const day10 = () =>
  promises.readFile('inputs/2020/day10.txt', 'utf8')
    .then(parse)
    .then(solve)
    .catch(error => console.log(error));
