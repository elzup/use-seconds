import { useState, useEffect } from "react";

const roundSeconds = (
  t: Date,
  delay: number,
  forceFloor: boolean
): [Date, number] => {
  const tk = +t - delay;
  const d = (tk + 1000) % 1000;
  const nextMs = 1000 - d;

  if (d < 500 || forceFloor) {
    return [new Date(tk - d + delay), nextMs];
  }
  return [new Date(tk + (1000 - d + delay)), nextMs + 1000];
};

export const useSeconds = (delay = 0): [Date, Date, number] => {
  const [time, setTime] = useState<Date>(new Date());
  const [eventTime, setEventTime] = useState<Date>(new Date());
  const [nextMs, setNextMs] = useState<number>(1000);

  useEffect(() => {
    let handle: number | null = null;

    const secondsCycle = (first = false) => {
      const eventTime = new Date();
      const [fixedTime, nextMs] = roundSeconds(eventTime, delay, first);

      handle = setTimeout(secondsCycle, Math.max(nextMs, 1));

      setTime(fixedTime);
      setEventTime(eventTime);
      setNextMs(nextMs);
    };

    secondsCycle(true);
    return () => {
      if (handle) {
        clearTimeout(handle);
      }
    };
  }, [delay]);

  return [time, eventTime, nextMs];
};
