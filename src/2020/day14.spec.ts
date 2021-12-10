import { readFile } from '../io';
import { day14a, day14b } from './day14';

const sample = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`;
const input = readFile('inputs/2020/day14.txt');

describe('day14', () => {
  describe('day14a', () => {
    it('should solve sample A', () => {
      // given, when
      const actual = day14a(sample);

      // then
      expect(actual)
        .toEqual(165);
    });

    it('should solve input A', (done) => {
      input
        .then(day14a)
        .finally(done);
    });
  });

  describe('day14b', () => {
    it('should solve sample B', () => {
      // given
      const input = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`;

      // when
      const actual = day14b(input);

      // then
      expect(actual)
        .toEqual(208);
    });

    it('should solve input B', (done) => {
      input
        .then(day14b)
        .finally(done);
    });
  });
});
