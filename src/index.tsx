import { useState, useEffect } from "react"
import { roundSeconds, now } from "./time"

export const useSeconds = (
  delay = 0,
  interval = 1000
): [Date, Date, number] => {
  const [eventTimeTmp, setEventTime] = useState<Date | null>(null)
  const eventTime = eventTimeTmp || now()
  const [time, nextMs] = roundSeconds(eventTime, delay, !eventTimeTmp, interval)

  useEffect(() => {
    const handle = setTimeout(
      () => {
        setEventTime(now())
      },
      Math.max(nextMs, 1)
    )

    return () => clearTimeout(handle)
  }, [eventTime])

  return [time, eventTime, nextMs]
}
