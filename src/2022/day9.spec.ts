import {readFile} from '../io';
import {doMoveTail, normalizeNumber, parse, solveA, solveB} from './day9';

const sampleA = [
    `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`
];
const sampleB = [
    `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
`
];
const expectedA = [13, 88];
const expectedB = [36];

const path = 'inputs/2022/day9.txt';
describe('day9', () => {
    describe('day9a', () => {
        for (let i = 0; i < sampleA.length; i++) {
            it(`should solve sample A ${i + 1}`, () => {
                // given
                const parsed = parse(sampleA[i]);

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

    describe('day9b', () => {
        describe('samples', () => {
            for (let i = 0; i < sampleB.length; i++) {
                it(`should solve sample B ${i + 1}`, () => {
                    // given
                    const parsed = parse(sampleB[i]);

                    // when
                    const actual = solveB(parsed);

                    // then
                    expect(actual)
                        .toEqual(expectedB[i]);
                });
            }
        });

        describe(normalizeNumber.name, () => {
            it('should normalize 1 to 1', () => {
                // given
                const n = 1;

                // when
                const actual = normalizeNumber(n);

                // then
                expect(actual).toEqual(1);
            });

            it('should normalize 0 to 0', () => {
                // given
                const n = 0;

                // when
                const actual = normalizeNumber(n);

                // then
                expect(actual).toEqual(0);
            });

            it('should normalize -1 to -1', () => {
                // given
                const n = -1;

                // when
                const actual = normalizeNumber(n);

                // then
                expect(actual).toEqual(-1);
            });

            it('should normalize 4 to 1', () => {
                // given
                const n = 4;

                // when
                const actual = normalizeNumber(n);

                // then
                expect(actual).toEqual(1);
            });

            it('should normalize -4 to -1', () => {
                // given
                const n = -4;

                // when
                const actual = normalizeNumber(n);

                // then
                expect(actual).toEqual(-1);
            });
        });

        describe(doMoveTail.name, () => {
            it('should close gap horizontally', () => {
                // given

                // when
                const actual = doMoveTail([2, 0], [0, 0]);

                // then
                expect(actual).toEqual([1, 0]);
            });

            it('should close gap vertically', () => {
                // given

                // when
                const actual = doMoveTail([0, 2], [0, 0]);

                // then
                expect(actual).toEqual([0, 1]);
            });

            it('should close gap diagonally + vertically', () => {
                // given

                // when
                const actual = doMoveTail([1, 2], [0, 0]);

                // then
                expect(actual).toEqual([1, 1]);
            });

            it('should close gap diagonally', () => {
                // given

                // when
                const actual = doMoveTail([2, 2], [0, 0]);

                // then
                expect(actual).toEqual([1, 1]);
            });
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
