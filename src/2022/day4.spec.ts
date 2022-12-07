import {readFile} from '../io';
import {parse, solveA, solveB} from './day4';

const sample1 = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const path = 'inputs/2022/day4.txt';
describe('day4', () => {
    describe('day4a', () => {
        it('should solve sample A', () => {
            // given
            const parsed = parse(sample1);

            // when
            const actual = solveA(parsed);

            // then
            expect(actual)
                .toEqual(2);
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
                .toEqual(4);
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
