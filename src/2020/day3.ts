import { readFile } from '../io';
import { product } from '../util';

const parseLine = (line: string): number[] => [...line].map(c => '#' === c ? 1 : 0);

const parse = (data: string): number[][] =>
  data.split('\n')
    .filter(line => line.trim().length > 0)
    .map(parseLine);

const count = (input: number[][], right: number, down: number): number =>
  input.map((value: number[], index: number) => {
    if (index % down !== 0) {
      return 0;
    }
    const i = ((index / down) * right) % value.length;
    // console.log(value.map((c, idx) => idx === i ? 'OX'[c] : '.#'[c])
    //   .join(''))
    return value[i];
  })
    .filter(value => value === 1)
    .length;

const count2 = (input: number[][], slopes: [number, number][]) =>
  slopes.map(([right, down]) => count(input, right, down))
    .map(c => {
      console.log(c);
      return c;
    })
    .reduce(product, 1);

const slopes: [number, number][] = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
const sample = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;
console.log(`${count(parse(sample), 1, 2)}`);
console.log(`${count2(parse(sample), slopes)}`);

export const day3 = () =>
  readFile('inputs/2020/day3.txt')
    .then(parse)
    .then(input => {
      console.log(`Number of trees #1: ${count(input, 3, 1)}`);

      const treeCount = count2(input, slopes);
      console.log(`Number of trees #2: ${treeCount}`);
    });
