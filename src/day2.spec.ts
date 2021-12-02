import {promises} from "fs";
import {day2a, day2b} from "./day2";

describe('day2', () => {
    describe('day2a', () => {
        it('should solve sample A', () => {
            // given
            const input = `forward 5
down 5
forward 8
up 3
down 8
forward 2`

            // when
            const actual = day2a(input);

            // then
            expect(actual).toEqual(150);
        });

        it('should solve input A', (done) => {
            promises.readFile('inputs/day2.txt', 'utf8')
                .then(day2a)
                .finally(done)
        });

        it('should solve sample B', () => {
            // given
            const input = `forward 5
down 5
forward 8
up 3
down 8
forward 2`

            // when
            const actual = day2b(input);

            // then
            expect(actual).toEqual(900);
        });

        it('should solve input B', (done) => {
            promises.readFile('inputs/day2.txt', 'utf8')
                .then(day2b)
                .finally(done)
        });
    });
});
