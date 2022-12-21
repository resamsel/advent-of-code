import {nonEmpty} from "../util";

enum Direction {
    R = 'R',
    L = 'L',
    U = 'U',
    D = 'D'
}

export interface Move {
    direction: Direction;
    distance: number;
}

const x = 0;
const y = 1;

export const needsTailMove = (head: [number, number], tail: [number, number]): boolean => {
    return Math.abs(head[x] - tail[x]) > 1 || Math.abs(head[y] - tail[y]) > 1;
}

const parseMove = (line: string): Move => {
    const [direction, amount] = line.split(' ');
    return {
        direction: Direction[direction as keyof typeof Direction],
        distance: parseInt(amount, 10)
    };
};

export const parse = (input: string): Move[] => {
    return input.split('\n')
        .filter(nonEmpty)
        .map(parseMove);
};

const doMove = (position: [number, number], direction: Direction): [number, number] => {
    switch (direction) {
        case Direction.U:
            return [position[x], position[y] + 1];
        case Direction.R:
            return [position[x] + 1, position[y]];
        case Direction.D:
            return [position[x], position[y] - 1];
        case Direction.L:
            return [position[x] - 1, position[y]];
        default:
            return position;
    }
};

export const normalizeNumber = (n: number): number => {
    return n !== 0 ? n / Math.abs(n) : 0;
}

export const doMoveTail = (head: [number, number], tail: [number, number]): [number, number] => {
    const diffX = head[x] - tail[x];
    const diffY = head[y] - tail[y];

    if (Math.abs(diffX) < 2 && Math.abs(diffY) < 2) {
        // no tail movement needed
        return tail;
    }

    return [tail[x] + normalizeNumber(diffX), tail[y] + normalizeNumber(diffY)];
};

export const solveA = (parsed: Move[]): number => {
    let head: [number, number] = [0, 0];
    let tail: [number, number] = [0, 0];
    const positions: Record<string, boolean> = {'0,0': true}
    parsed.forEach(move => {
        for (let i = 0; i < move.distance; i++) {
            head = doMove(head, move.direction);

            if (needsTailMove(head, tail)) {
                tail = doMoveTail(head, tail);
                positions[`${tail.join(',')}`] = true;
            }
        }
    });
    return Object.keys(positions).length;
};

export const solveB = (parsed: Move[]): number => {
    const knots: [number, number][] = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
    const positions: Record<string, boolean> = {'0,0': true}
    parsed.forEach(move => {
        for (let i = 0; i < move.distance; i++) {
            knots.forEach((knot, index) => {
                if (index === 0) {
                    knots[0] = doMove(knot, move.direction);
                    return;
                }
                const previousKnot = knots[index - 1];

                if (needsTailMove(previousKnot, knot)) {
                    knots[index] = doMoveTail(previousKnot, knot);
                }
            });
            positions[`${knots[knots.length - 1].join(',')}`] = true;
        }
    });
    return Object.keys(positions).length;
};
