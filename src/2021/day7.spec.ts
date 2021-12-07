import { promises } from 'fs';
import { readFile } from '../io';
import { day7a, day7b, summedCost } from './day7';

const sample = `16,1,2,0,4,2,7,1,2,14`;
const path = 'inputs/2021/day7.txt';

describe('day7', () => {
  describe('day7a', () => {
    it('should solve sample A', () => {
      // given
      const input = sample;

      // when
      const actual = day7a(input);

      // then
      expect(actual)
        .toEqual(37);
    });

    it('should solve input A', (done) => {
      promises.readFile(path, 'utf8')
        .then(day7a)
        .finally(done);
    });
  });

  describe('day7b', () => {
    it('should calculate cost for distance 0', () => {
      // given
      const distance = 0;

      // when
      const actual = summedCost(distance);

      // then
      expect(actual)
        .toEqual(0);
    });

    it('should calculate cost for distance 1', () => {
      // given
      const distance = 1;

      // when
      const actual = summedCost(distance);

      // then
      expect(actual)
        .toEqual(1);
    });

    it('should calculate cost for distance 2', () => {
      // given
      const distance = 2;

      // when
      const actual = summedCost(distance);

      // then
      expect(actual)
        .toEqual(3);
    });

    it('should calculate cost for distance 3', () => {
      // given
      const distance = 3;

      // when
      const actual = summedCost(distance);

      // then
      expect(actual)
        .toEqual(6);
    });

    it('should solve sample B', () => {
      // given
      const input = sample;

      // when
      const actual = day7b(input);

      // then
      expect(actual)
        .toEqual(168);
    });

    it('should solve input B', (done) => {
      readFile(path)
        .then(day7b)
        .finally(done);
    });
  });
});
