export function groupBy<T, K extends keyof T>(arr: T[], selector: K) {
  return arr.reduce((map, item) => {
    const key = item[selector];
    const group = map.get(key);
    if (!group) {
      map.set(key, [item]);
    } else {
      group.push(item);
    }
    return map;
  }, new Map<T[K], T[]>());
}
