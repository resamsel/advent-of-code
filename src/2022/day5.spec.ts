import {readFile} from '../io';
import {parse, solveA, solveB} from './day5';

const sample1 = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`;

const path = 'inputs/2022/day5.txt';
describe('day5', () => {
    describe('day5a', () => {
        it('should solve sample A', () => {
            // given
            const parsed = parse(sample1);

            // when
            const actual = solveA(parsed);

            // then
            expect(actual)
                .toEqual("CMZ");
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
                .toEqual("MCD");
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
