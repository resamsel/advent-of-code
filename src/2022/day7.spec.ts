import {readFile} from '../io';
import {parse, solveA, solveB} from './day7';

const sample = [
    `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`
];
const expectedA = [95437];
const expectedB = [24933642];

const path = 'inputs/2022/day7.txt';
describe('day7', () => {
    describe('day7a', () => {
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

    describe('day7b', () => {
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
