import { readFile } from '../io';
import { day15a, day15b } from './day15';

const sample = `0,3,6`;
const input = readFile('inputs/2020/day15.txt');

describe('day15', () => {
  describe('day15a', () => {
    it('should solve sample A', () => {
      // given, when
      const actual = day15a(sample);

      // then
      expect(actual)
        .toEqual(436);
    });

    it('should solve input A', (done) => {
      input
        .then(day15a)
        .finally(done);
    });
  });

  describe('day15b', () => {
    it('should solve sample B', () => {
      // given, when
      const actual = day15b(sample);

      // then
      expect(actual)
        .toEqual(175594);
    });

    it('should solve input B', (done) => {
      input
        .then(day15b)
        .finally(done);
    });
  });
});
