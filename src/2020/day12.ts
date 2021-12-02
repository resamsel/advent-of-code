import {promises} from 'fs'

interface Position {
    x: number;
    y: number;
}

enum Action {
    North = 'N',
    South = 'S',
    East = 'E',
    West = 'W',
    Left = 'L',
    Right = 'R',
    Forward = 'F',
}

interface Instruction {
    action: Action;
    value: number;
}

const parseInstruction = (line: string): Instruction => ({
    action: line[0] as Action,
    value: parseInt(line.substr(1), 10),
})

const parse = (data: string): Instruction[] =>
    data.split('\n')
        .filter(line => line.trim().length > 0)
        .map(line => parseInstruction(line))

const rightTurns = [Action.North, Action.East, Action.South, Action.West, Action.North, Action.East, Action.South]

function turnRight(direction: Action, times: number): Action {
    return rightTurns[rightTurns.findIndex(d => d === direction) + times]
}

const leftTurns = [Action.North, Action.West, Action.South, Action.East, Action.North, Action.West, Action.South]

function turnLeft(direction: Action, times: number): Action {
    return leftTurns[leftTurns.findIndex(d => d === direction) + times]
}

const solve = (parsed: Instruction[]): void => {
    // console.log(JSON.stringify(parsed))
    let east = 0,
        north = 0,
        direction = Action.East
    parsed.forEach(instruction => {
        switch (instruction.action) {
            case Action.North:
                north += instruction.value
                break
            case Action.South:
                north -= instruction.value
                break
            case Action.East:
                east += instruction.value
                break
            case Action.West:
                east -= instruction.value
                break
            case Action.Forward:
                switch (direction) {
                    case Action.North:
                        north += instruction.value
                        break
                    case Action.South:
                        north -= instruction.value
                        break
                    case Action.East:
                        east += instruction.value
                        break
                    case Action.West:
                        east -= instruction.value
                        break
                }
                break
            case Action.Right:
                direction = turnRight(direction, instruction.value / 90)
                break
            case Action.Left:
                direction = turnLeft(direction, instruction.value / 90)
        }
    })
    console.log(`Position: east ${east}, north ${north}, Manhattan distance = ${Math.abs(east) + Math.abs(north)}`)
}

function turnRight2(position: Position, times: number): Position {
    if (times === 0) {
        return position
    }

    return turnRight2({
        x: position.y,
        y: -position.x,
    }, times - 1)
}

function turnLeft2(position: Position, times: number): Position {
    if (times === 0) {
        return position
    }

    return turnLeft2({
        x: -position.y,
        y: position.x,
    }, times - 1)
}

const solve2 = (parsed: Instruction[]): void => {
    // console.log(JSON.stringify(parsed))
    let position: Position = {x: 0, y: 0}
    let waypoint: Position = {x: 10, y: 1}
    parsed.forEach(instruction => {
        switch (instruction.action) {
            case Action.North:
                waypoint.y += instruction.value
                break
            case Action.South:
                waypoint.y -= instruction.value
                break
            case Action.East:
                waypoint.x += instruction.value
                break
            case Action.West:
                waypoint.x -= instruction.value
                break
            case Action.Forward:
                position = {
                    x: position.x + waypoint.x * instruction.value,
                    y: position.y + waypoint.y * instruction.value,
                }
                break
            case Action.Right:
                waypoint = turnRight2(waypoint, instruction.value / 90)
                break
            case Action.Left:
                waypoint = turnLeft2(waypoint, instruction.value / 90)
        }
    })
    console.log(`Position: ${position.x}, ${position.y}, Manhattan distance = ${Math.abs(position.x) + Math.abs(position.y)}`)
}

const sample = `F10
N3
F7
R90
F11
`

try {
    const parsed = parse(sample)
    solve(parsed)
    solve2(parsed)
} catch (e) {
}

export const day12 = () =>
    promises.readFile('inputs/2020/day12.txt', 'utf8')
        .then(parse)
        .then(solve2)
        .catch(error => console.log(error))
