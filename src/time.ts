/**
 * Date-related utilities for time rounding operations.
 * This module isolates Date dependencies for future Temporal API migration.
 */

export const now = (): Date => new Date()

export const fromMillis = (ms: number): Date => new Date(ms)

export const toMillis = (t: Date): number => +t

export const roundSeconds = (
  t: Date,
  delay: number,
  forceFloor: boolean,
  interval: number
): [Date, number] => {
  const tk = toMillis(t) - delay
  const d = (tk + interval) % interval
  const nextMs = interval - d

  if (d < interval / 2 || forceFloor) {
    return [fromMillis(tk - d + delay), nextMs]
  }
  return [fromMillis(tk + (interval - d + delay)), nextMs + interval]
}
