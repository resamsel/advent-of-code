import { readFile } from '../io';
import { day16a, day16b } from './day16';

const sample = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`;
const input = readFile('inputs/2020/day16.txt');

describe('day16', () => {
  describe('day16a', () => {
    it('should solve sample A', () => {
      // given, when
      const actual = day16a(sample);

      // then
      expect(actual)
        .toEqual(71);
    });

    it('should solve input A', (done) => {
      input
        .then(day16a)
        .finally(done);
    });
  });

  describe('day16b', () => {
    it('should solve sample B', () => {
      // given
      const input = `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`

      // when
      const actual = day16b(input);

      // then
      expect(actual)
        .toEqual(1716);
    });

    it('should solve input B', (done) => {
      input
        .then(s => day16b(s, 'departure'))
        .finally(done);
    });
  });
});
