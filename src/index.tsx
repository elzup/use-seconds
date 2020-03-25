import { useState, useEffect } from "react"

const roundSeconds = (
  t: Date,
  delay: number,
  forceFloor: boolean
): [Date, number] => {
  const tk = +t - delay
  const d = (tk + 1000) % 1000
  const nextMs = 1000 - d

  if (d < 500 || forceFloor) {
    return [new Date(tk - d + delay), nextMs]
  }
  return [new Date(tk + (1000 - d + delay)), nextMs + 1000]
}

export const useSeconds = (delay = 0): [Date, Date, number] => {
  const [eventTime, setEventTime] = useState<Date>(new Date())
  const [first, setFirst] = useState<boolean>(true)
  const [time, nextMs] = roundSeconds(eventTime, delay, first)

  useEffect(() => {
    const handle = setTimeout(() => {
      setFirst(false)
      setEventTime(new Date())
    }, Math.max(nextMs, 1))

    return () => clearTimeout(handle)
  }, [eventTime])

  return [time, eventTime, nextMs]
}
