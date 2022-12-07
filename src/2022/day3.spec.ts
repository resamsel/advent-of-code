import {readFile} from '../io';
import {parse, prioritizeItem, solveA, solveB} from './day3';

const sample1 = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const path = 'inputs/2022/day3.txt';
describe('day3', () => {
    describe('day3a', () => {
        it('should solve sample A', () => {
            // given
            const parsed = parse(sample1);

            // when
            const actual = solveA(parsed);

            // then
            expect(actual)
                .toEqual(157);
        });

        it('should prioritize item a', function () {
            const actual = prioritizeItem('a');
            expect(actual).toEqual(1);
        });

        it('should prioritize item A', function () {
            const actual = prioritizeItem('A');
            expect(actual).toEqual(27);
        });

        it('should solve input A', (done) => {
            readFile(path)
                .then(parse)
                .then(solveA)
                .then(actual => console.log(`Solution: ${actual}`))
                .finally(done);
        });

        it('should solve sample B', () => {
            // given
            const parsed = parse(sample1);

            // when
            const actual = solveB(parsed);

            // then
            expect(actual)
                .toEqual(70);
        });

        it('should solve input B', (done) => {
            readFile(path)
                .then(parse)
                .then(solveB)
                .then(actual => console.log(`Solution: ${actual}`))
                .finally(done);
        });
    });
});
