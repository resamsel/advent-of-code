import {readFile} from '../io';
import {parse, solveA, solveB} from './day2';

const sample1 = `A Y
B X
C Z`;

const path = 'inputs/2022/day2.txt';
describe('day2', () => {
    describe('day2a', () => {
        it('should solve sample A', () => {
            // given
            const parsed = parse(sample1);

            // when
            const actual = solveA(parsed);

            // then
            expect(actual)
                .toEqual(15);
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
                .toEqual(12);
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
