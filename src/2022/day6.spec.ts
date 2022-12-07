import {readFile} from '../io';
import {parse, solveA, solveB} from './day6';

const sample = [
    `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
    `bvwbjplbgvbhsrlpgdmjqwftvncz`,
    `nppdvjthqldpwncqszvftbrmjlhg`,
    `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
    `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`
];
const expectedA = [7, 5, 6, 10, 11];
const expectedB = [19, 23, 23, 29, 26];

const path = 'inputs/2022/day6.txt';
describe('day6', () => {
    describe('day6a', () => {
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

    describe('day6b', () => {
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
