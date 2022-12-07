import {nonEmpty} from "../util";

export interface Rucksack {
    compartments: string[][];
}

const parseRucksack = (line: string): Rucksack => {
    return {
        compartments: [
            line.slice(0, line.length / 2).split(''),
            line.slice(line.length / 2).split('')
        ]
    };
};
export const parse = (input: string): Rucksack[] => {
    return input.split('\n')
        .filter(nonEmpty)
        .reduce((rucksacks, line) =>
            [...rucksacks, parseRucksack(line)], [] as Rucksack[]);
};

const duplicateItem = (rucksack: Rucksack): string => {
    return rucksack.compartments[0].filter(i => rucksack.compartments[1].includes(i))[0];
};

const charCodeLowerCaseA = 'a'.charCodeAt(0);
export const prioritizeItem = (item: string): number => {
    const charCode = item.charCodeAt(0);
    if (charCode >= charCodeLowerCaseA) {
        return charCode - charCodeLowerCaseA + 1;
    }
    return charCode - 38;
}

export const solveA = (parsed: Rucksack[]): number => {
    return parsed.map(rucksack => duplicateItem(rucksack))
        .map(prioritizeItem)
        .reduce((sum, next) => sum + next, 0);
};

const duplicateItemOfRucksacks = (a: Rucksack, b: Rucksack, c: Rucksack): string => {
    const itemsA = a.compartments.flatMap(i => i);
    const itemsB = b.compartments.flatMap(i => i);
    const itemsC = c.compartments.flatMap(i => i);
    return itemsA.filter(i => itemsB.includes(i) && itemsC.includes(i))[0];
};

export const solveB = (parsed: Rucksack[]): number => {
    return parsed
        .reduce((agg, next, index, self) => {
            if (index % 3 === 2) {
                // end of group
                return [...agg, duplicateItemOfRucksacks(self[index - 2], self[index - 1], self[index])];
            }
            return agg;
        }, [] as string[])
        .reduce((sum, next) => sum + prioritizeItem(next), 0);
};
