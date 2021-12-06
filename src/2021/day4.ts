import { parseNumbers, transpose } from '../util';

interface Item {
  value: number;
  marked: boolean;
}

interface Board {
  numbers: Item[][];
}

interface Bingo {
  numbers: number[];
  boards: Board[];
}

const parseBoard = (input: string): Board => {
  return ({
    numbers: input.split('\n')
      .filter(x => x.trim() !== '')
      .map(line =>
        parseNumbers(line, /\s+/)
          .filter(x => !isNaN(x))
          .map(n => ({value: n, marked: false}))),
  });
};

export const parse = (input: string): Bingo => {
  const [numbersString, ...boardsString] = input
    .split('\n\n');
  return {
    numbers: parseNumbers(numbersString),
    boards: boardsString
      .map(x => parseBoard(x)),
  };
};

const sumUnmarked = (input: Item[][]): number => {
  return input.reduce((sum, curr) => sum + curr.filter(x => !x.marked)
    .reduce((sum2, curr2) => sum2 + curr2.value, 0), 0);
};

const checkBoard = (board: Board): boolean => {
  return board.numbers.find((row, index) => row.every(value => value.marked) || transpose(board.numbers)[index].every(value => value.marked)) !== undefined;
};

const markBoard = (board: Board, n: number): void => {
  board.numbers.forEach(row => row.forEach(item => {
    if (item.value === n) {
      item.marked = true;
    }
  }));
};

export const solve = (parsed: Bingo): number => {
  let winnerBoard: Board, currentNumber: number;
  parsed.numbers.find(value => {
    parsed.boards.forEach(board => markBoard(board, value))
    const winner = parsed.boards.find(board => checkBoard(board))
    if (winner !== undefined) {
      winnerBoard = winner
      currentNumber = value
      return true
    }
    return false
  });

  return sumUnmarked(winnerBoard!.numbers) * currentNumber!;
};

export const solveB = (parsed: Bingo): number => {
  let board: Board, currentNumber: number;
  parsed.numbers.find(value => {
    parsed.boards.forEach(board => markBoard(board, value))
    const lastBoards = parsed.boards.filter(board => !checkBoard(board))
    if (lastBoards.length === 1) {
      board = lastBoards[0]
    }
    if (lastBoards.length === 0) {
      currentNumber = value
      return true
    }
    return false
  });

  return sumUnmarked(board!.numbers) * currentNumber!;
};

export const day4a = (input: string): number => {
  const parsed = parse(input);
  const solved = solve(parsed);
  console.log(`Solution: ${solved}`);
  return solved;
};

export const day4b = (input: string): number => {
  const parsed = parse(input);
  const solved = solveB(parsed);
  console.log(`Solution: ${solved}`);
  return solved;
};
