import { List } from 'immutable';
import { readFile } from '../io';
import { hasDuplicateSmallCave, parse, solveA, solveB } from './day12';

const sample1 = `start-A
start-b
A-c
A-b
b-d
A-end
b-end
`;
const sample3 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;
const input = readFile('inputs/2021/day12.txt');

describe('day12', () => {
  describe('day12a', () => {
    it('should solve sample A1', () => {
      // given
      const parsed = parse(sample1);

      // when
      const actual = solveA(parsed);

      // then
      console.log(`Solution: ${actual}`);
      expect(actual)
        .toEqual(10);
    });

    it('should solve sample A3', () => {
      // given
      const parsed = parse(sample3);

      // when
      const actual = solveA(parsed);

      // then
      console.log(`Solution: ${actual}`);
      expect(actual)
        .toEqual(226);
    });

    it('should solve input A', (done) => {
      input
        .then(parse)
        .then(solveA)
        .then(actual => console.log(`Solution: ${actual}`))
        .finally(done);
    });
  });

  describe('day12b', () => {
    it('should solve sample B1', () => {
      // given
      const parsed = parse(sample1);

      // when
      const actual = solveB(parsed);

      // then
      console.log(`Solution: ${actual}`);
      expect(actual)
        .toEqual(36);
    });

    it('should solve sample B3', () => {
      // given
      const parsed = parse(sample3);

      // when
      const actual = solveB(parsed);

      // then
      console.log(`Solution: ${actual}`);
      expect(actual)
        .toEqual(3509);
    });

    it('should find duplicate small cave', function() {
      const actual = hasDuplicateSmallCave(List.of('a', 'b', 'c', 'b'));

      expect(actual)
        .toBeTruthy();
    });

    it('should find no duplicate small cave', function() {
      const actual = hasDuplicateSmallCave(List.of('a', 'b', 'c'));

      expect(actual)
        .toBeFalsy();
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
