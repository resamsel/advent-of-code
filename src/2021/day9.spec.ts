import { readFile } from '../io';
import { day9a, day9b } from './day9';

const sample = `2199943210
3987894921
9856789892
8767896789
9899965678`;
const input = readFile('inputs/2021/day9.txt');

describe('day9', () => {
  describe('day9a', () => {
    it('should solve sample A', () => {
      // given, when
      const actual = day9a(sample);

      // then
      expect(actual)
        .toEqual(15);
    });

    it('should solve input A', (done) => {
      input
        .then(day9a)
        .finally(done);
    });
  });

  describe('day9b', () => {
    it('should solve sample B', () => {
      // given, when
      const actual = day9b(sample);

      // then
      expect(actual)
        .toEqual(1134);
    });

    it('should solve input B', (done) => {
      input
        .then(day9b)
        .finally(done);
    });
  });
});
