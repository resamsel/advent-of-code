import {intersect, nonEmpty, parseNumbers} from "../util";

export interface Assignment {
    sections: number[][];
}

const range = (size: number, startAt = 0): number[] => {
    return [...Array(size).keys()].map(i => i + startAt);
};

export const rangeFromString = (s: string): number[] => {
    const ranges = parseNumbers(s, '-');
    return range(ranges[1] - ranges[0] + 1, ranges[0]);
}

const parseLine = (line: string): Assignment => {
    return {
        sections: line.split(',').map(rangeFromString)
    };
};
export const parse = (input: string): Assignment[] => {
    return input.split('\n')
        .filter(nonEmpty)
        .reduce((agg, line) =>
            [...agg, parseLine(line)], [] as Assignment[]);
};

const contains = (item: Assignment): boolean => {
    const firstSection = item.sections[0];
    const secondSection = item.sections[1];
    return intersect(firstSection, secondSection).length === Math.min(firstSection.length, secondSection.length);
}

export const solveA = (parsed: Assignment[]): number => {
    return parsed.filter(contains).length;
};

const isOverlapping = (item: Assignment): boolean => {
    const firstSection = item.sections[0];
    const secondSection = item.sections[1];
    return intersect(firstSection, secondSection).length > 0;
}

export const solveB = (parsed: Assignment[]): number => {
    return parsed.filter(isOverlapping).length;
};
