import {readFile} from '../io';
import {getSprite, parse, solveA, solveB} from './day10';

const sampleA = [
    `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`
];
const sampleB = sampleA;
const expectedA = [13140];
const expectedB = [`##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`];

const path = 'inputs/2022/day10.txt';
describe('day10', () => {
    describe('day10a', () => {
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

    describe('day10b', () => {
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

        describe('getSprite', () => {
            it('should create a sprite from position 1', () => {
                // given
                const position = 1;

                // when
                const actual = getSprite(position);

                // then
                expect(actual).toEqual('###.....................................');
            });

            it('should create a sprite from position 36', () => {
                // given
                const position = 36;

                // when
                const actual = getSprite(position);

                // then
                expect(actual).toEqual('...................................###..');
            });

            it('should create a sprite from position 38', () => {
                // given
                const position = 38;

                // when
                const actual = getSprite(position);

                // then
                expect(actual).toEqual('.....................................###');
            });
        });

        it('should solve input B', (done) => {
            readFile(path)
                .then(parse)
                .then(solveB)
                .then(actual => console.log(`Solution: \n${actual}`))
                .finally(done);
        });
    });
});
