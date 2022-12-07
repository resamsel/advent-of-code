import {readFile} from '../io';
import {parse, solveA, solveB} from './day1';

const path = 'inputs/2022/day1.txt';
describe('day1', () => {
    describe('day1a', () => {
        it('should solve sample A', () => {
            // given
            const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

            // when
            const actual = solveA(parse(input));

            // then
            expect(actual)
                .toEqual(24000);
        });

        it('should solve input A', (done) => {
            readFile(path)
                .then(parse)
                .then(solveA)
                .then(console.log)
                .finally(done);
        });

        it('should solve sample B', () => {
            // given
            const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

            // when
            const actual = solveB(parse(input));

            // then
            expect(actual)
                .toEqual(45000);
        });

        it('should solve input B', (done) => {
            readFile(path)
                .then(parse)
                .then(solveB)
                .then(console.log)
                .finally(done);
        });
    });
});
