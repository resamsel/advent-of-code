import { List, Map, Set } from 'immutable';
import { nonEmpty } from '../util';

interface Edge {
  from: string;
  to: string;
}

interface Path {
  path: List<string>;
  hasDuplicates: boolean;
  finished: boolean;
  map: Map<string, boolean>;
}

export const parse = (input: string): Edge[] => {
  return input.split('\n')
    .filter(nonEmpty)
    .flatMap(line => {
      const [start, end] = line.split('-');
      return [{from: start, to: end}, {from: end, to: start}];
    });
};

const isBigCave = (name: string): boolean => name.toUpperCase() === name;

const firstUnfinishedPath = (paths: Set<Path>): Path | undefined =>
  paths.find(path => !path.finished);

const addEdgeA = (paths: Set<Path>, path: Path, edge: Edge): Set<Path> => {
  if (isBigCave(edge.to)) {
    // edge end is allowed multiple times in the path
    return addPath(paths, List([...path.path, edge.to]), false);
  }

  // edge end is allowed only once in the path
  if (!path.map.has(edge.to)) {
    return addPath(paths, List([...path.path, edge.to]), false);
  }

  return paths;
};

export const hasDuplicateSmallCave = (path: List<string>): boolean => {
  return path
    .find((value, index, self) =>
      value !== 'start' && value !== 'end' && !isBigCave(value) && self.indexOf(value) !== index,
    ) !== undefined;
};

const addPath = (paths: Set<Path>, path: List<string>, originHasDuplicates: boolean): Set<Path> => {
  return paths.add({
    path,
    // if origin has duplicates, we inherited them
    hasDuplicates: originHasDuplicates || hasDuplicateSmallCave(path),
    finished: path.last() === 'end',
    map: path.reduce((map, next) => map.set(next, true), Map<string, boolean>()),
  });
};

const addEdgeB = (paths: Set<Path>, path: Path, edge: Edge): Set<Path> => {
  if (edge.to === 'start') {
    // start is allowed only once in the path
    return paths;
  }

  if (isBigCave(edge.to)) {
    // big cave is allowed multiple times in the path
    const p = path.path.push(edge.to);
    return addPath(paths, p, path.hasDuplicates);
  }

  // one small cave is allowed twice in the path
  // other small caves are allowed only once in the path
  if (!path.hasDuplicates || !path.map.has(edge.to)) {
    return addPath(paths, path.path.push(edge.to), path.hasDuplicates);
  }

  return paths;
};

const mapEdges = (edges: Edge[]): Record<string, Edge[]> => {
  return edges.reduce((map, next) => {
    if (next.from !== 'end' && next.to !== 'start') {
      // ignore if edge starts in 'end' or ends in 'start'
      map[next.from] = [...(map[next.from] ?? []), next];
    }
    return map;
  }, {} as Record<string, Edge[]>);
};

export const breathFirst = (
  edges: Edge[],
  paths: Set<Path>,
  addEdge: (paths: Set<Path>, path: Path, candidate: Edge) => Set<Path>,
): Set<Path> => {
  const edgeMap: Record<string, Edge[]> = mapEdges(edges);
  // consume unfinished paths
  while (true) {
    const path = firstUnfinishedPath(paths);
    if (path === undefined) {
      return paths;
    }

    paths = paths.remove(path);

    const tail = path.path.last()!;
    edgeMap[tail].forEach(edge => {
      paths = addEdge(paths, path, edge);
    });
  }
};

export const solveA = (parsed: Edge[]): number => {
  return breathFirst(parsed, addPath(Set(), List.of('start'), false), addEdgeA).size;
};

export const solveB = (parsed: Edge[]): number => {
  return breathFirst(parsed, addPath(Set(), List.of('start'), false), addEdgeB).size;
};

if (process.argv.length === 2) {
  solveB(parse(`fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`));
}
