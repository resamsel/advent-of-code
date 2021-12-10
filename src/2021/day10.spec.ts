import { readFile } from '../io';
import { day10a, day10b, scoreB } from './day10';

const sample = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;
const input = readFile('inputs/2021/day10.txt');

describe('day10', () => {
  describe('day10a', () => {
    it('should solve sample A', () => {
      // given, when
      const actual = day10a(sample);

      // then
      expect(actual)
        .toEqual(26397);
    });

    it('should solve input A', (done) => {
      input
        .then(day10a)
        .finally(done);
    });
  });

  describe('day10b', () => {
    it('should calculate score sample', function() {
      const actual = scoreB('])}>');

      expect(actual)
        .toEqual(294);
    });

    it('should solve sample B', () => {
      // given, when
      const actual = day10b(sample);

      // then
      expect(actual)
        .toEqual(288957);
    });

    it('should solve input B', (done) => {
      input
        .then(day10b)
        .finally(done);
    });
  });
});
