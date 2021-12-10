import { nonEmpty, sum } from '../util';

enum InstructionType {
  Mask, Assignment
}

interface Instruction {
  type: InstructionType;
  index: number;
  value: string;
}

interface Program {
  mask: string;
  memory: Record<string, number>;
}

const parseLine = (line: string): Instruction => {
  if (line.startsWith('mask = ')) {
    return {
      type: InstructionType.Mask,
      index: 0,
      value: line.split(' = ')[1],
    };
  }

  const [, indexString, value] = line.match(/mem\[(\d+)] = (\d+)/)!;
  return {
    type: InstructionType.Assignment,
    index: parseInt(indexString, 10),
    value,
  };
};

export const parse = (input: string): Instruction[] => {
  return input.split('\n')
    .filter(nonEmpty)
    .map(parseLine);
};

const intToPaddedBinary = (value: string): string => {
  const integer = parseInt(value, 10);
  const binaryString = integer.toString(2);
  return '0'.repeat(36 - binaryString.length) + binaryString;
};

const valueWithMask = (value: string, mask: string): number => {
  const bin = intToPaddedBinary(value);
  return parseInt([...bin].map((digit, index) => mask[index] === 'X' ? digit : mask[index], 10)
    .join(''), 2);
};

const solve = (parsed: Instruction[]): number => {
  const memory = parsed.reduce((program, instruction) => {
    switch (instruction.type) {
      case InstructionType.Mask:
        return {...program, mask: instruction.value};
      case InstructionType.Assignment:
        const memory = program.memory;
        memory[`${instruction.index}`] = valueWithMask(instruction.value, program.mask);
        return {...program, memory};
    }
    return program;
  }, {
    mask: '',
    memory: {},
  } as Program)
    .memory;

  return Object.values(memory)
    .filter(x => !isNaN(x))
    .reduce(sum, 0);
};

const addressesWithMask = (address: number, mask: string): number[] => {
  const addressBinary = intToPaddedBinary(address.toString(10));
  return [...mask].reduce((indexes, digit, bitmaskIndex) => {
    switch (digit) {
      case '0':
        return indexes.map(index => index * 2 + parseInt(addressBinary[bitmaskIndex], 2));
      case '1':
        return indexes.map(index => index * 2 + 1);
      default:
        return [...indexes.map(index => index * 2), ...indexes.map(index => index * 2 + 1)];
    }
  }, [0] as number[]);
};

export const solveB = (parsed: Instruction[]): number => {
  const memory = parsed.reduce((program, instruction) => {
    switch (instruction.type) {
      case InstructionType.Mask:
        return {...program, mask: instruction.value};
      case InstructionType.Assignment:
        const memory = program.memory;
        addressesWithMask(instruction.index, program.mask).forEach(address => {
          memory[`${address}`] = parseInt(instruction.value, 10)
        });
        return {...program, memory};
    }
    return program;
  }, {
    mask: '',
    memory: {},
  } as Program)
    .memory;

  return Object.values(memory)
    .filter(x => !isNaN(x))
    .reduce(sum, 0);
};

export const day14a = (input: string): number => {
  const parsed = parse(input);
  const solved = solve(parsed);
  console.log(`Solution: ${solved}`);
  return solved;
};

export const day14b = (input: string): number => {
  const parsed = parse(input);
  const solved = solveB(parsed);
  console.log(`Solution: ${solved}`);
  return solved;
};
