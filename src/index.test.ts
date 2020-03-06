import { useSeconds } from "./";
import { renderHook, act } from "@testing-library/react-hooks";
import { advanceTo } from "jest-date-mock";

// mock timer using jest
jest.useFakeTimers();

const date = new Date(2020, 2, 22, 22, 22, 0);
test("updates every second", () => {
  act(() => {
    advanceTo(new Date(date).setSeconds(0, 0));
  });
  const { result } = renderHook(() => useSeconds());

  expect(result.current).toMatchInlineSnapshot(`
    Object {
      "eventTime": 2020-03-22T13:22:00.000Z,
      "nextMs": 1000,
      "time": 2020-03-22T13:22:00.000Z,
    }
  `);

  // Fast-forward 1 sec
  act(() => {
    advanceTo(new Date(date).setSeconds(1, 0));
    jest.advanceTimersByTime(1000);
  });
  expect(result.current).toMatchInlineSnapshot(`
    Object {
      "eventTime": 2020-03-22T13:22:01.000Z,
      "nextMs": 1000,
      "time": 2020-03-22T13:22:01.000Z,
    }
  `);

  // Fast-forward 1 sec
  act(() => {
    advanceTo(new Date(date).setSeconds(2, 0));
    jest.advanceTimersByTime(1000);
  });
  expect(result.current).toMatchInlineSnapshot(`
    Object {
      "eventTime": 2020-03-22T13:22:02.000Z,
      "nextMs": 1000,
      "time": 2020-03-22T13:22:02.000Z,
    }
  `);
});

test("fixed time is valid", () => {
  act(() => {
    advanceTo(new Date(date).setSeconds(0, 800));
  });
  const { result } = renderHook(() => useSeconds());

  expect(result.current).toMatchInlineSnapshot(`
    Object {
      "eventTime": 2020-03-22T13:22:00.800Z,
      "nextMs": 1200,
      "time": 2020-03-22T13:22:01.000Z,
    }
  `);

  act(() => {
    advanceTo(new Date(date).setSeconds(1, 995));
    jest.advanceTimersByTime(result.current.nextMs);
  });
  expect(result.current).toMatchInlineSnapshot(`
    Object {
      "eventTime": 2020-03-22T13:22:01.995Z,
      "nextMs": 1005,
      "time": 2020-03-22T13:22:02.000Z,
    }
  `);

  act(() => {
    advanceTo(new Date(date).setSeconds(2, 997));
    jest.advanceTimersByTime(result.current.nextMs);
  });
  expect(result.current).toMatchInlineSnapshot(`
    Object {
      "eventTime": 2020-03-22T13:22:02.997Z,
      "nextMs": 1003,
      "time": 2020-03-22T13:22:03.000Z,
    }
  `);

  act(() => {
    advanceTo(new Date(date).setSeconds(4, 200));
    jest.advanceTimersByTime(result.current.nextMs);
  });
  expect(result.current).toMatchInlineSnapshot(`
    Object {
      "eventTime": 2020-03-22T13:22:04.200Z,
      "nextMs": 800,
      "time": 2020-03-22T13:22:04.000Z,
    }
  `);
});
