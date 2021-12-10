import { List } from 'immutable';
import { sum } from '../util';

enum Type {
  OK, Incomplete, Corrupt
}

interface Result {
  type: Type;
  found: string;
  expected: string;
  // debugging info
  lineNumber: number;
  column: number;
}

export const parse = (input: string): List<string> => {
  return List(input.split('\n')
    .filter(x => x.trim() !== ''));
};

const matchingCharacters: Record<string, string> = {
  '(': ')',
  ')': '(',
  '[': ']',
  ']': '[',
  '{': '}',
  '}': '{',
  '<': '>',
  '>': '<',
};

const pointMapA: Record<string, number> = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const pointMapB: Record<string, number> = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

export const scoreB = (expected: string): number => {
  return [...expected].reduce((agg, curr) => agg * 5 + pointMapB[curr], 0);
};

/**
 * Works for this puzzle, not the correct implementation.
 */
const median = (list: List<number>): number =>
  list.sort((a, b) => a - b)
    .get((list.size - 1) / 2)!;

const validate = (line: string, lineNumber: number): Result => {
  let stack = List([] as string[]);
  for (let column = 0; column < line.length; column++) {
    const found = line[column];
    switch (found) {
      case '(':
      case '[':
      case '{':
      case '<':
        // add opening character to stack, always OK
        stack = stack.push(found);
        break;
      default:
        // need to verify closing character
        const expected = matchingCharacters[found];
        if (stack.last() !== expected) {
          // unexpected topmost character
          return {type: Type.Corrupt, found, lineNumber, column, expected};
        }
        // pop from stack
        stack = stack.pop();
        break;
    }
  }

  if (stack.size > 0) {
    return {
      type: Type.Incomplete,
      found: stack.last()!,
      lineNumber,
      column: line.length,
      expected: stack.reduce((expected, c) => matchingCharacters[c] + expected, ''),
    };
  }

  return {type: Type.OK, found: '', lineNumber, column: -1, expected: ''};
};

export const solveA = (parsed: List<string>): number => {
  return parsed.map(validate)
    .filter(result => result.type === Type.Corrupt)
    .map(result => pointMapA[result.found])
    .reduce(sum, 0);
};

export const solveB = (parsed: List<string>): number => {
  return median(parsed.map(validate)
    .filter(result => result.type === Type.Incomplete)
    .map(result => scoreB(result.expected)));
};

export const day10a = (input: string): number => {
  const solved = solveA(parse(input));
  console.log(`Solution: ${solved}`);
  return solved;
};

export const day10b = (input: string): number => {
  const solved = solveB(parse(input));
  console.log(`Solution: ${solved}`);
  return solved;
};
