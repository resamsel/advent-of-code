import { promises } from 'fs';
import { readFile } from '../io';
import { day6a, day6b } from './day6';

const sample = `3,4,3,1,2`;
const path = 'inputs/2021/day6.txt';

describe('day6', () => {
  describe('day6a', () => {
    it('should solve sample A', () => {
      // given
      const input = sample;

      // when
      const actual = day6a(input);

      // then
      expect(actual)
        .toEqual(5934);
    });

    it('should solve input A', (done) => {
      promises.readFile(path, 'utf8')
        .then(day6a)
        .finally(done);
    });
  });

  describe('day6b', () => {
    it('should solve sample B', () => {
      // given
      const input = sample;

      // when
      const actual = day6b(input);

      // then
      expect(actual)
        .toEqual(26984457539);
    });

    it('should solve input B', (done) => {
      readFile(path)
        .then(day6b)
        .finally(done);
    });
  });
});
