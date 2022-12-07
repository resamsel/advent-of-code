import {nonEmpty} from "../util";

interface Step {
    amount: number;
    sourceIndex: number;
    targetIndex: number;
}

export interface State {
    stacks: string[][];
    steps: Step[];
}

const parseStack = (stackString: string): string[] => {
    const stack: string[] = [];
    for (let i = 0; i < stackString.length; i += 4) {
        const a = stackString.slice(i + 1, i + 2);
        stack.push(a);
    }
    return stack;
};

const parseStacks = (input: string): string[][] => {
    return input.split('\n')
        .reduce((stacks, next, index, self) => {
            if (index === self.length - 1) {
                return stacks;
            }

            const stack = parseStack(next);
            stack.forEach((v, index) => {
                if (v === ' ') {
                    return;
                }

                stacks[index] = [v, ...(stacks[index] ?? [])];
            });
            return stacks;
        }, [] as string[][]);
};

const parseStep = (line: string): Step => {
    const [, amountString, , sourceString, , targetString] = line.split(' ');
    return {
        amount: parseInt(amountString, 10),
        sourceIndex: parseInt(sourceString, 10) - 1,
        targetIndex: parseInt(targetString, 10) - 1
    };
}

const parseSteps = (steps: string): Step[] => {
    return steps.split('\n')
        .filter(nonEmpty)
        .map(parseStep);
};

export const parse = (input: string): State => {
    const [stacks, steps] = input.split('\n\n');

    return {
        stacks: parseStacks(stacks),
        steps: parseSteps(steps)
    };
};

const executeSteps = (stacks: string[][], steps: Step[]): string[][] => {
    steps.forEach((step) => {
        for (let i = 0; i < step.amount; i++) {
            const crate = stacks[step.sourceIndex].pop();
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            stacks[step.targetIndex].push(crate!);
        }
    });
    return stacks;
};

export const solveA = (parsed: State): string => {
    const result = executeSteps(parsed.stacks, parsed.steps);
    return result.map(stack => stack[stack.length - 1])
        .reduce((agg, next) => agg + next, '');
};

const executeSteps9001 = (stacks: string[][], steps: Step[]): string[][] => {
    steps.forEach((step) => {
        const tmp: string[] = [];
        for (let i = 0; i < step.amount; i++) {
            const crate = stacks[step.sourceIndex].pop();
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            tmp.push(crate!);
        }
        stacks[step.targetIndex] = [...stacks[step.targetIndex], ...tmp.reverse()];
    });
    return stacks;
};

export const solveB = (parsed: State): string => {
    const result = executeSteps9001(parsed.stacks, parsed.steps);
    return result.map(stack => stack[stack.length - 1])
        .reduce((agg, next) => agg + next, '');
};
