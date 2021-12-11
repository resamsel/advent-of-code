import { readFile } from '../io';
import { parse, solveA, solveB } from './day11';

const sample = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;
const input = readFile('inputs/2021/day11.txt');

describe('day11', () => {
  describe('day11a', () => {
    it('should solve sample A', () => {
      // given
      const parsed = parse(sample);

      // when
      const actual = solveA(parsed);

      // then
      console.log(`Solution: ${actual}`);
      expect(actual)
        .toEqual(1656);
    });

    it('should solve input A', (done) => {
      input
        .then(parse)
        .then(solveA)
        .then(actual => console.log(`Solution: ${actual}`))
        .finally(done);
    });
  });

  describe('day11b', () => {
    it('should solve sample B', () => {
      // given
      const parsed = parse(sample);

      // when
      const actual = solveB(parsed);

      // then
      console.log(`Solution: ${actual}`);
      expect(actual)
        .toEqual(195);
    });

    it('should solve input B', (done) => {
      input
        .then(parse)
        .then(solveB)
        .then(actual => console.log(`Solution: ${actual}`))
        .finally(done);
    });
  });
});
