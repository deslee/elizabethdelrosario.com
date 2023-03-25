export function filterNonNullish<T>(t: T): t is NonNullable<T> {
  return t !== null && t !== undefined;
}