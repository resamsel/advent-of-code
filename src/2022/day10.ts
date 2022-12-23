import {nonEmpty, sum} from "../util";

enum InstructionType {
    AddX = "addx",
    Noop = "noop"
}

interface Instruction {
    type: InstructionType;
    value: number;
}

const parseInstruction = (line: string): Instruction => {
    const [typeString, valueString] = line.split(' ');
    return {
        type: typeString as InstructionType,
        value: parseInt(valueString, 10)
    };
};

export const parse = (input: string): Instruction[] => {
    return input.split('\n')
        .filter(nonEmpty)
        .map(parseInstruction);
};

const interestingCycles = [20, 60, 100, 140, 180, 220];

export const solveA = (parsed: Instruction[]): number => {
    const signalStrengths: number[] = [];
    let xRegister = 1;

    let readInstruction = true;
    let instruction: Instruction | undefined = undefined;
    for (let i = 1; i <= Math.max(...interestingCycles); i++) {
        if (interestingCycles.includes(i)) {
            signalStrengths.push(i * xRegister);
        }

        if (readInstruction) {
            // read instruction and process it
            instruction = parsed.shift();
            if (instruction !== undefined) {
                // do only if we have an instruction
                switch (instruction.type) {
                    case InstructionType.Noop:
                        readInstruction = true;
                        break;
                    case InstructionType.AddX:
                        readInstruction = false;
                        break;
                }
            }
        } else {
            if (instruction !== undefined) {
                xRegister += instruction.value;
                readInstruction = true;
            }
        }
    }

    return signalStrengths.reduce(sum);
};

export const getSprite = (position: number): string => {
    const indexes = [position - 1, position, position + 1];
    return Array.from(Array(40).keys())
        .map(index => indexes.includes(index) ? '#' : '.')
        .join('');
};

export const solveB = (parsed: Instruction[]): string => {
    let xRegister = 1;
    const crt: string[][] = [];

    let readInstruction = true;
    let instruction: Instruction | undefined = undefined;
    let line: string[] = [];
    let sprite = getSprite(xRegister);
    for (let i = 1; i <= 40 * 6; i++) {
        if ((i - 1) % 40 === 0) {
            line = [];
            crt.push(line);
        }

        line.push(sprite.charAt((i - 1) % sprite.length));

        if (readInstruction) {
            // read instruction and process it
            instruction = parsed.shift();
            if (instruction !== undefined) {
                // do only if we have an instruction
                switch (instruction.type) {
                    case InstructionType.Noop:
                        readInstruction = true;
                        break;
                    case InstructionType.AddX:
                        readInstruction = false;
                        break;
                }
            }
        } else {
            if (instruction !== undefined) {
                xRegister += instruction.value;
                readInstruction = true;
                sprite = getSprite(xRegister);
            }
        }
    }

    return crt.map(line => line.join('')).join('\n');
};
