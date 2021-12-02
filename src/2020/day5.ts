import {promises} from 'fs'

interface BoardingPass {
  encoded: string;
  row: number;
  column: number;
}

const frontBack = (s: string): string => s === 'F' ? '0' : '1'
const leftRight = (s: string): string => s === 'L' ? '0' : '1'
const seatId = (boardingPass: BoardingPass): number => boardingPass.row * 8 + boardingPass.column

const parseBoardingPass = (encoded: string): BoardingPass => {
  const row = parseInt([...encoded.substr(0, 7)].map((s: string) => frontBack(s))
    .join(''), 2)
  const column = parseInt([...encoded.substr(7)].map((s: string) => leftRight(s))
    .join(''), 2)
  return {
    encoded,
    row,
    column,
  }
}

const parse = (data: string): BoardingPass[] =>
  data.split('\n')
    .filter(line => line.trim().length > 0)
    .map(parseBoardingPass)

const maxSeatId = (boardingPasses: BoardingPass[]): number =>
  boardingPasses.map(seatId)
    .reduce((max, curr) => curr > max ? curr : max, 0)

const sample = `FBFBBFFRLR
BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`

console.log(`Sample: ${JSON.stringify(maxSeatId(parse(sample)))}`)

export const day5 = () =>
    promises.readFile('inputs/2020/day5.txt', 'utf8')
  .then(parse)
  .then(input => {
    console.log(`Max seat ID: ${maxSeatId(input)}`)
    console.log(`My seat ID: ${(input.map(seatId).sort((a, b) => a - b).find((id, index, ids) => ids[index + 1] === id + 2) ?? 0) + 1}`)
  })
