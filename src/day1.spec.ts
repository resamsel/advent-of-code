import {day1a, day1b} from "./day1";
import {promises} from "fs";

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
            promises.readFile('inputs/day1.txt', 'utf8')
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
            promises.readFile('inputs/day1.txt', 'utf8')
                .then(day1b)
                .finally(done)
        });
    });
});
