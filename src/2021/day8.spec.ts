import { readFile } from '../io';
import { day8a, day8b } from './day8';

const sample = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;
const input = readFile('inputs/2021/day8.txt');

describe('day8', () => {
  describe('day8a', () => {
    it('should solve sample A', () => {
      // given, when
      const actual = day8a(sample);

      // then
      expect(actual)
        .toEqual(26);
    });

    it('should solve input A', (done) => {
      input
        .then(day8a)
        .finally(done);
    });
  });

  describe('day8b', () => {
    it('should solve sample B', () => {
      // given, when
      const actual = day8b(sample);

      // then
      expect(actual)
        .toEqual(61229);
    });

    it('should solve input B', (done) => {
      input
        .then(day8b)
        .finally(done);
    });
  });
});
