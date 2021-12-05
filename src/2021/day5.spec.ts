import { promises } from 'fs';
import { readFile } from '../io';
import { day5a, day5b } from './day5';

const sample = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;
const path = 'inputs/2021/day5.txt';

describe('day5', () => {
  describe('day5a', () => {
    it('should solve sample A', () => {
      // given
      const input = sample;

      // when
      const actual = day5a(input);

      // then
      expect(actual)
        .toEqual(5);
    });

    it('should solve input A', (done) => {
      promises.readFile(path, 'utf8')
        .then(day5a)
        .finally(done);
    });
  });

  describe('day5b', () => {
    it('should solve sample B', () => {
      // given
      const input = sample;

      // when
      const actual = day5b(input);

      // then
      expect(actual)
        .toEqual(12);
    });

    it('should solve input B', (done) => {
      readFile(path)
        .then(day5b)
        .finally(done);
    });
  });
});
