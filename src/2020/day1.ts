import { readFile } from '../io';
import { cartesianProduct, parseNumbers } from '../util';

export const day1a = () =>
  readFile('inputs/2020/day1.txt')
    .then(data => parseNumbers(data, '\n'))
    .then(entries => {
      const resultA = cartesianProduct(entries, entries)
        .find(([a, b]) => a + b === 2020) ?? [0, 0];
      console.log(`${resultA[0]} + ${resultA[1]} = 2020, ${resultA[0]} * ${resultA[1]} = ${resultA[0] * resultA[1]}`);
    });

export const day1b = () =>
  readFile('inputs/2020/day1.txt')
    .then(data => parseNumbers(data, '\n'))
    .then(entries => {
      const resultB = cartesianProduct(entries, entries, entries)
        .find(([a, b, c]) => a + b + c === 2020) ?? [0, 0, 0];
      console.log(`${resultB[0]} + ${resultB[1]} + ${resultB[2]} = 2020, ${resultB[0]} * ${resultB[1]} * ${resultB[2]} = ${resultB[0] * resultB[1] * resultB[2]}`);
    });
