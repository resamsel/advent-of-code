import {day1a, day1b} from "./day1";
import {readFile} from "../io";

const path = 'inputs/2021/day1.txt';
describe('day1', () => {
    describe('day1a', () => {
        it('should solve sample A', () => {
            // given
            const input = `199
200
208
210
200
207
240
269
260
263`

            // when
            const actual = day1a(input);

            // then
            expect(actual).toEqual(7);
        });

        it('should solve input A', (done) => {
            readFile(path)
                .then(day1a)
                .finally(done)
        });

        it('should solve sample B', () => {
            // given
            const input = `199
200
208
210
200
207
240
269
260
263`

            // when
            const actual = day1b(input);

            // then
            expect(actual).toEqual(5);
        });

        it('should solve input B', (done) => {
            readFile(path)
                .then(day1b)
                .finally(done)
        });
    });
});
