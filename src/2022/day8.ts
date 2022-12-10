import {nonEmpty, numericDesc, parseNumbers, product} from "../util";

export interface Tree {
    height: number;
    visible: boolean;
}

export const parse = (input: string): Tree[][] => {
    const parsed = input.split('\n')
        .filter(nonEmpty)
        .map((line) => parseNumbers(line, '').map(height => ({height, visible: false})));

    for (let row = 0; row < parsed.length; row++) {
        for (let column = 0; column < parsed[row].length; column++) {
            parsed[row][column].visible = isTreeVisible(row, column, parsed);
        }
    }

    return parsed;
};

const isTallest = (tree: Tree, trees: Tree[]): boolean => trees.find(t => t.height >= tree.height) === undefined;

const isTreeVisible = (row: number, column: number, forest: Tree[][]): boolean => {
    if (row === 0 || column === 0 || row === forest.length - 1 || column === forest[row].length - 1) {
        return true;
    }

    const current = forest[row][column];

    if (isTallest(current, forest[row].slice(0, column))) {
        return true;
    }

    if (isTallest(current, forest[row].slice(column + 1))) {
        return true;
    }

    if (isTallest(current, forest.map(r => r[column]).slice(0, row))) {
        return true;
    }

    return isTallest(current, forest.map(r => r[column]).slice(row + 1));
};

export const solveA = (parsed: Tree[][]): number => {
    return parsed.reduce((count, row) => count + row.filter(tree => tree.visible).length, 0);
};

const scenicScore = (tree: Tree, trees: Tree[]): number => {
    const index = trees.findIndex(t => t.height >= tree.height);

    if (index < 0) {
        return trees.length;
    }

    return index + 1;
}

const calculateScenicValue = (row: number, column: number, forest: Tree[][]): number => {
    const scenicValues: number[] = [];

    const tree = forest[row][column];

    scenicValues.push(scenicScore(tree, forest[row].slice(0, column).reverse()));
    scenicValues.push(scenicScore(tree, forest[row].slice(column + 1)));
    scenicValues.push(scenicScore(tree, forest.map(r => r[column]).slice(0, row).reverse()));
    scenicValues.push(scenicScore(tree, forest.map(r => r[column]).slice(row + 1)));

    return scenicValues.reduce(product);
};

export const solveB = (parsed: Tree[][]): number => {
    return parsed
        .flatMap(( row, rowIndex) => row
            .map((tree, columnIndex) => calculateScenicValue(rowIndex, columnIndex, parsed)))
        .sort(numericDesc)[0];
};
