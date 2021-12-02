import {promises} from 'fs'

enum Seat {
    Floor = '.',
    Empty = 'L',
    Occupied = '#'
}

const parseLine = (line: string): Seat[] => {
    return line.split('') as Seat[]
}

const parse = (data: string): Seat[][] =>
    data.split('\n')
        .filter(line => line.trim().length > 0)
        .map(line => parseLine(line))

const countAdjacentOccupiedSeats = (row: number, col: number, seats: Seat[][]): number => {
    return [
        ...(row > 0 ? seats[row - 1].slice(Math.max(col - 1, 0), col + 2) : []),
        seats[row][col - 1],
        seats[row][col + 1],
        ...((row + 1) < seats.length ? seats[row + 1].slice(Math.max(col - 1, 0), col + 2) : []),
    ]
        .filter(seat => seat === Seat.Occupied)
        .length
}

const seatInDirection = (seats: Seat[][], row: number, col: number, rowDelta: number, colDelta: number): Seat => {
    let currRow = row + rowDelta
    let currCol = col + colDelta
    while (0 <= currRow && currRow < seats.length && 0 <= currCol && currCol < seats[currRow].length) {
        switch (seats[currRow][currCol]) {
            case Seat.Empty:
            case Seat.Occupied:
                return seats[currRow][currCol]
        }
        currRow += rowDelta
        currCol += colDelta
    }

    return Seat.Floor
}

const countDirectionalOccupiedSeats = (row: number, col: number, seats: Seat[][]): number => {
    return [
        seatInDirection(seats, row, col, 1, 0),
        seatInDirection(seats, row, col, 1, 1),
        seatInDirection(seats, row, col, 0, 1),
        seatInDirection(seats, row, col, -1, 1),
        seatInDirection(seats, row, col, -1, 0),
        seatInDirection(seats, row, col, -1, -1),
        seatInDirection(seats, row, col, 0, -1),
        seatInDirection(seats, row, col, 1, -1),
    ]
        .filter(seat => seat === Seat.Occupied)
        .length
}

const applyAdjacent = (seats: Seat[][]): Seat[][] => {
    return seats.map((cols, row) =>
        cols.map((s, col) => {
            const occupied = countAdjacentOccupiedSeats(row, col, seats)
            if (s === Seat.Empty && occupied === 0) {
                return Seat.Occupied
            }
            if (s === Seat.Occupied && occupied >= 4) {
                return Seat.Empty
            }
            return s
        }),
    )
}

const applyDirectional = (seats: Seat[][]): Seat[][] => {
    return seats.map((cols, row) =>
        cols.map((s, col) => {
            const occupied = countDirectionalOccupiedSeats(row, col, seats)
            if (s === Seat.Empty && occupied === 0) {
                return Seat.Occupied
            }
            if (s === Seat.Occupied && occupied >= 5) {
                return Seat.Empty
            }
            return s
        }),
    )
}

const equals = (a: Seat[][], b: Seat[][]): boolean => JSON.stringify(a) === JSON.stringify(b)

const solve = (seats: Seat[][], fn: (i: Seat[][]) => Seat[][]): void => {
    let a = seats
    let b = fn(a)
    let count = 1
    while (!equals(a, b)) {
        a = b
        b = fn(b)
        count += 1
    }
    const occupied = b.reduce((agg, curr) => [...agg, ...curr], [])
        .filter(s => s === Seat.Occupied)
        .length
    console.log(`Stable after ${count} iterations, ${occupied} occupied`)
}

const sample = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
`

try {
    const parsed = parse(sample)
    solve(parsed, applyAdjacent)
    solve(parsed, applyDirectional)
} catch (e) {
}

export const day11 = () =>
    promises.readFile('inputs/2020/day11.txt', 'utf8')
        .then(parse)
        .then(seats => solve(seats, applyDirectional))
        .catch(error => console.log(error))
