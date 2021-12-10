import { List, Map, Range, Set } from 'immutable';
import { nonEmpty, nonUndefined, parseNumbers, product, sum } from '../util';

interface Input {
  fields: Map<number, Set<string>>;
  myTicket: number[];
  nearbyTickets: number[][];
}

export const parse = (input: string): Input => {
  const [fieldsString, myTicketString, nearbyTicketsString] = input.split('\n\n');
  return {
    fields: fieldsString.split('\n')
      .filter(nonEmpty)
      .reduce((fieldsOuter, curr) => {
        const [name, rangesString] = curr.split(': '); // separate name and ranges
        return rangesString.split(' or ')
          // consume ranges
          .reduce((fieldsInner, range) => {
            // put name in all indexes for range
            const [minString, maxString] = range.split('-');
            return Range(parseInt(minString, 10), parseInt(maxString, 10) + 1)
              .reduce((f, index) =>
                // add name to set
                f.set(index, (f.get(index) ?? Set<string>()).add(name)), fieldsInner);
          }, fieldsOuter);
      }, Map<number, Set<string>>()),
    myTicket: parseNumbers(myTicketString.split('\n')[1]), // we don't need the header
    nearbyTickets: nearbyTicketsString.split('\n')
      // we don't need the header
      .slice(1)
      .map(line => parseNumbers(line)),
  };
};

const solveA = (input: Input): number => {
  return input.nearbyTickets.map(ticket => ticket.map(n => input.fields.get(n) === undefined ? n : 0)
    .reduce(sum, 0))
    .reduce(sum, 0);
};

const collectOptions = (input: Input): Map<number, Set<string>> => {
  return input.nearbyTickets
    // map ticket fields to their possible field names
    .map(ticket => ticket.map<Set<string>>((n) => input.fields.get(n)!))
    // keep only valid tickets
    .filter(ticket => ticket.every(nonUndefined))
    // keep only possible field names per ticket field
    .reduce((fieldOptionMapOuter, curr) =>
      curr.reduce((fieldOptionMapInner, fieldOptions, index) => {
        if (fieldOptionMapInner.has(index)) {
          // intersect already collected field options with current ones
          return fieldOptionMapInner.set(index, fieldOptionMapInner.get(index)!.intersect(fieldOptions));
        } else {
          // no value yet, use current field options
          return fieldOptionMapInner.set(index, fieldOptions);
        }
      }, fieldOptionMapOuter), Map<number, Set<string>>());
};

const deductFields = (options: Map<number, Set<string>>): Map<number, string> => {
  let fields: Map<number, string> = Map();

  while (!options.isEmpty()) {
    options = options
      .map((options, key) => {
        if (options.size === 1) {
          // this field can be used, as it only has one option
          fields = fields.set(key, options.first());
          return Set<string>();
        }

        // remove already deducted fields from the options
        return options.subtract(Set(fields.values()));
      })
      // keeps only options that are not empty
      .filter(options => !options.isEmpty());
  }

  return fields;
};

const solveB = (input: Input, prefix: string): number => {
  const options = collectOptions(input);
  const fields = deductFields(options);
  return List(fields.entries())
    .filter(([, name]) => name.startsWith(prefix))
    .map(([index]) => input.myTicket[index])
    .reduce(product, 1);
};

export const day16a = (input: string): number => {
  const parsed = parse(input);
  const solved = solveA(parsed);
  console.log(`Solution: ${solved}`);
  return solved;
};

export const day16b = (input: string, prefix = ''): number => {
  const parsed = parse(input);
  const solved = solveB(parsed, prefix);
  console.log(`Solution: ${solved}`);
  return solved;
};
