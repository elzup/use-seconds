import { useState, useEffect } from "react";

const roundSeconds = (t: Date): [Date, number] => {
  const d = +t % 1000;
  const nextMs = 1000 - t.getMilliseconds();

  if (d < 500) {
    return [new Date(+t - d), nextMs];
  }
  return [new Date(+t + (1000 - d)), nextMs + 1000];
};

export const useSeconds = (): [Date, Date, number] => {
  const [time, setTime] = useState<Date>(new Date());
  const [eventTime, setEventTime] = useState<Date>(new Date());
  const [nextMs, setNextMs] = useState<number>(1000);

  useEffect(() => {
    let handle: NodeJS.Timeout | null = null;

    const secondsCycle = () => {
      const eventTime = new Date();
      const [fixedTime, nextMs] = roundSeconds(eventTime);

      handle = setTimeout(secondsCycle, Math.max(nextMs, 1));

      setTime(fixedTime);
      setEventTime(eventTime);
      setNextMs(nextMs);
    };

    secondsCycle();
    return () => {
      if (handle) {
        clearTimeout(handle);
      }
    };
  }, []);

  return [time, eventTime, nextMs];
};
