import {readFile} from '../io';
import {parse, solveA, solveB} from './day8';

const sample = [
    `30373
25512
65332
33549
35390
`
];
const expectedA = [21];
const expectedB = [8];

const path = 'inputs/2022/day8.txt';
describe('day8', () => {
    describe('day8a', () => {
        for (let i = 0; i < sample.length; i++) {
            it(`should solve sample A ${i + 1}`, () => {
                // given
                const parsed = parse(sample[i]);

                // when
                const actual = solveA(parsed);

                // then
                expect(actual)
                    .toEqual(expectedA[i]);
            });
        }

        it('should solve input A', (done) => {
            readFile(path)
                .then(parse)
                .then(solveA)
                .then(actual => console.log(`Solution: ${actual}`))
                .finally(done);
        });
    });

    describe('day8b', () => {
        for (let i = 0; i < sample.length; i++) {
            it(`should solve sample B ${i + 1}`, () => {
                // given
                const parsed = parse(sample[i]);

                // when
                const actual = solveB(parsed);

                // then
                expect(actual)
                    .toEqual(expectedB[i]);
            });
        }

        it('should solve input B', (done) => {
            readFile(path)
                .then(parse)
                .then(solveB)
                .then(actual => console.log(`Solution: ${actual}`))
                .finally(done);
        });
    });
});
