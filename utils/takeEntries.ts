/**
 * Takes a specified number of entries from an object and returns a new object containing only those entries.
 *
 * @template T - The type of the values in the input object.
 * @param obj - The object to take entries from.
 * @param count - The number of entries to take from the input object.
 * @returns A new object containing the first `count` entries from the input object.
 */
export const takeEntries = <T>(
  obj: { [key: number]: T },
  count: number
): { [key: number]: T } =>
  Object.fromEntries(Object.entries(obj).slice(0, count));
