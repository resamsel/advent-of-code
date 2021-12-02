import {promises} from 'fs'

interface Command {
    instruction: string;
    value: number;
}

const parseIndividual = (item: string): Command => {
    const [instruction, value] = item.split(' ')
    return {
        instruction, value: parseInt(value, 10),
    }
}

const parse = (data: string): Command[] =>
    data.split('\n')
        .filter(line => line.trim().length > 0)
        .map(line => parseIndividual(line))

const run = (program: Command[]): number => {
    let acc = 0
    let pointer = 0
    const history: number[] = []
    while (true) {
        if (history.includes(pointer)) {
            throw new Error(`${acc}`)
        }
        history.push(pointer)

        if (pointer >= program.length) {
            // end of program reached
            return acc
        }

        const command = program[pointer]
        switch (command.instruction) {
            case 'acc':
                acc += command.value
                pointer += 1
                // console.log(`acc: ${acc} (${command.value})`)
                break
            case 'jmp':
                pointer += command.value
                // console.log(`jmp: ${pointer} (${command.value})`)
                break
            case 'nop':
                pointer += 1
                break
        }
    }
}

const fix = (input: Command[]): number | undefined => {
    return input.map((command, index) => {
        if (!['nop', 'jmp'].includes(command.instruction)) {
            return undefined
        }

        const fixedProgram = [...input]
        switch (command.instruction) {
            case 'jmp':
                fixedProgram[index] = {instruction: 'nop', value: command.value}
                break
            case 'nop':
                fixedProgram[index] = {instruction: 'jmp', value: command.value}
                break
        }

        try {
            return run(fixedProgram)
        } catch (e) {
            // ignore
        }

        return undefined
    })
        .find(result => result !== undefined)
}

const sample = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`

try {
    console.log(`Sample: ${run(parse(sample))}`)
} catch (e) {
}

export const day8 = () =>
    promises.readFile('inputs/2020/day8.txt', 'utf8')
        .then(parse)
        .then(input => {
            console.log(`Run: ${fix(input)}`)
        })
        .catch(error => console.log(error))
