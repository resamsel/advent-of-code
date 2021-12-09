import { BusDelay, calculate, Day13, day13a, day13b, findProductWithDiff, parse, solve2, validate } from './day13';

const sample = `939
7,13,x,x,59,x,31,19
`;

describe('day13', () => {
  describe('findProductWithDiff', () => {
    it('should find product with diff of 7/13', () => {
      // given
      const a = 7;
      const b = 13;
      const diff = 1;

      // when
      const actual = findProductWithDiff(a, b, diff);

      // then
      expect(actual % a)
        .toEqual(0);
      expect((actual + diff) % b)
        .toEqual(0);
    });

    it('should find product with diff of 17/13', () => {
      // given
      const a = 17;
      const b = 13;
      const diff = 1;

      // when
      const actual = findProductWithDiff(a, b, diff);

      // then
      expect(actual % a)
        .toEqual(0);
      expect((actual + diff) % b)
        .toEqual(0);
    });

    xit('should find product with diff of three numbers', () => {
      // given
      const a = 7;
      const b = 13;
      const c = 59;
      const diffB = 1;
      const diffC = 2;

      // when
      const first = findProductWithDiff(a, b, diffB);
      const actual = findProductWithDiff(first, c, diffC);

      // then
      expect(actual % a)
        .toEqual(0);
      expect((actual + diffB) % b)
        .toEqual(0);
      expect((actual + diffC) % c)
        .toEqual(0);
    });
  });

  describe('validate', () => {
    it('should validate 7/13', function() {
      const input: BusDelay[] = [{id: 17, delay: 0}, {id: 13, delay: 1}];

      const actual = validate(input, 51);

      expect(actual)
        .toBeTruthy();
    });

    it('should validate sample B', function() {
      const input: BusDelay[] = parse(sample)
        .buses
        .filter(x => x.id !== 0);

      const actual = validate(input, 1068781);

      expect(actual)
        .toBeTruthy();
    });
  });

  describe('calculate', () => {
    it('should calculate 7/13', function() {
      const input: BusDelay[] = [{id: 17, delay: 0}, {id: 13, delay: 1}];

      const actual = calculate(input);

      expect(actual)
        .toEqual(51);
    });

    it('should calculate sample B', function() {
      const input: BusDelay[] = parse(sample).buses;

      const actual = calculate(input);

      expect(actual)
        .toEqual(1068781);
    });
  });

  describe('solve2', () => {
    it('should find departure of 7,13', () => {
      // given
      const parsed: Day13 = {
        now: 0,
        buses: [
          {id: 7, delay: 0},
          {id: 13, delay: 1},
        ],
      };

      // when
      const actual = solve2(parsed);

      // then
      expect(actual)
        .toEqual(77);
    });

    xit('should find departure of 17,x,13,19', () => {
      // given
      const parsed: Day13 = {
        now: 0,
        buses: [
          {id: 17, delay: 0},
          {id: 0, delay: 1},
          {id: 13, delay: 2},
          {id: 19, delay: 3},
        ],
      };

      // when
      const actual = solve2(parsed);

      // then
      expect(actual)
        .toEqual(3417);
    });
  });

  describe('day13a', () => {
    it('should solve A', (done) => {
      day13a()
        .finally(done);
    });
  });

  describe('day13b', () => {
    it('should solve B', (done) => {
      day13b()
        .finally(done);
    });
  });
});
