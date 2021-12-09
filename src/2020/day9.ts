import { promises } from 'fs';
import { cartesianProduct, numericAsc } from '../util';

const parse = (data: string): number[] =>
  data.split('\n')
    .filter(line => line.trim().length > 0)
    .map(line => parseInt(line, 10));

const validate = (input: number[], test: number): boolean => {
  return cartesianProduct(input, input)
    .filter(([a, b]) => a !== b)
    .find(([a, b]) => a + b === test) !== undefined;
};

const findFirstInvalid = (input: number[], preamble: number): number => {
  let index = preamble;
  while (index <= input.length && validate(input.slice(index - preamble, index), input[index])) {
    index += 1;
  }

  return input[index];
};

const subSetSummingTo = (input: number[], expected: number): number[] | undefined => {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    sum += input[i];
    if (sum === expected) {
      return input.slice(0, i + 1);
    }

    if (sum > expected) {
      return undefined;
    }
  }

  return undefined;
};

const findContiguousSet = (input: number[], expected: number): number[] | undefined => {
  for (let i = 0; i < input.length; i++) {
    const result = subSetSummingTo(input.slice(i), expected);

    if (result !== undefined) {
      return result;
    }
  }

  return undefined;
};

const sample = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576
`;

try {
  const input = parse(sample);
  const firstInvalid = findFirstInvalid(input, 5);
  console.log(`Sample: ${firstInvalid}`);
  console.log(`Find contiguous set: ${findContiguousSet(input, firstInvalid)}`);
} catch (e) {
}

export const day9 = () =>
  promises.readFile('inputs/2020/day9.txt', 'utf8')
    .then(parse)
    .then(input => {
      const firstInvalid = findFirstInvalid(input, 25);
      console.log(`First invalid: ${firstInvalid}`);
      const contiguousSet = findContiguousSet(input, firstInvalid)!.sort(numericAsc);
      console.log(`Find contiguous set: ${contiguousSet}, sum of first and last: ${contiguousSet[0] + contiguousSet[contiguousSet.length - 1]}`);

    })
    .catch(error => console.log(error));
