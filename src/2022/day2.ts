import {nonEmpty} from "../util";

export enum Shape {
    Rock = 'rock',
    Paper = 'paper',
    Scissors = 'scissors'
}

const shapeMap: Record<string, Shape> = {
    A: Shape.Rock,
    X: Shape.Rock,
    B: Shape.Paper,
    Y: Shape.Paper,
    C: Shape.Scissors,
    Z: Shape.Scissors
};

const shapePoints: Record<Shape, number> = {
    [Shape.Rock]: 1,
    [Shape.Paper]: 2,
    [Shape.Scissors]: 3
};

const pointsForWin = 6;
const pointsForDraw = 3;
const pointsForLoss = 0;

export const resultPoints = (a: Shape, b: Shape): number => {
    if (a === b) {
        return pointsForDraw;
    }

    switch (a) {
        case Shape.Paper:
            return b === Shape.Rock ? pointsForWin : pointsForLoss;
        case Shape.Rock:
            return b === Shape.Scissors ? pointsForWin : pointsForLoss;
        default:
            return b === Shape.Paper ? pointsForWin : pointsForLoss;
    }
};

export const parse = (input: string): [Shape, Shape][] => {
    return input.split('\n')
        .filter(nonEmpty)
        .reduce((strategy, line) => {
            const strings = line.split(' ', 2);
            return [...strategy, [shapeMap[strings[0]], shapeMap[strings[1]]]];
        }, [] as [Shape, Shape][]);
};

export const solveA = (parsed: [Shape, Shape][]): number => {
    return parsed.map(([a, b]) => shapePoints[b] + resultPoints(b, a))
        .reduce((sum, next) => sum + next, 0);
};

const outcomeMap: Record<Shape, number> = {
    [Shape.Rock]: -1, // X
    [Shape.Paper]: 0, // Y
    [Shape.Scissors]: 1 // Z
};

const winMap: Record<Shape, Shape> = {
    [Shape.Scissors]: Shape.Rock,
    [Shape.Rock]: Shape.Paper,
    [Shape.Paper]: Shape.Scissors
};
const lossMap: Record<Shape, Shape> = {
    [Shape.Rock]: Shape.Scissors,
    [Shape.Paper]: Shape.Rock,
    [Shape.Scissors]: Shape.Paper
};

const decideShape = (a: Shape, outcomeShape: Shape): [Shape, Shape] => {
    switch (outcomeMap[outcomeShape]) {
        case -1:
            return [a, lossMap[a]];
        case 1:
            return [a, winMap[a]];
        case 0:
        default:
            // draw
            return [a, a];
    }
};

export const solveB = (parsed: [Shape, Shape][]): number => {
    return parsed
        .map(([a, b]) => decideShape(a, b))
        .map(([a, b]) => shapePoints[b] + resultPoints(b, a))
        .reduce((sum, next) => sum + next, 0);
};
