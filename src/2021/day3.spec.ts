import { promises } from 'fs';
import { readFile } from '../io';
import { day3a, day3b } from './day3';

const sample = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;
const path = 'inputs/2021/day3.txt';

describe('day3', () => {
  describe('day3a', () => {
    it('should solve sample A', () => {
      // given
      const input = sample;

      // when
      const actual = day3a(input);

      // then
      expect(actual)
        .toEqual(198);
    });

    it('should solve input A', (done) => {
      promises.readFile(path, 'utf8')
        .then(day3a)
        .finally(done);
    });

    it('should solve sample B', () => {
      // given
      const input = sample;

      // when
      const actual = day3b(input);

      // then
      expect(actual)
        .toEqual(230);
    });

    it('should solve input B', (done) => {
      readFile(path)
        .then(day3b)
        .finally(done);
    });
  });
});
