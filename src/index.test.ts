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
    Array [
      2020-03-22T13:22:00.000Z,
      2020-03-22T13:22:00.000Z,
      1000,
    ]
  `);

  // Fast-forward 1 sec
  act(() => {
    advanceTo(new Date(date).setSeconds(1, 0));
    jest.advanceTimersByTime(1000);
  });
  expect(result.current).toMatchInlineSnapshot(`
    Array [
      2020-03-22T13:22:01.000Z,
      2020-03-22T13:22:01.000Z,
      1000,
    ]
  `);

  // Fast-forward 1 sec
  act(() => {
    advanceTo(new Date(date).setSeconds(2, 0));
    jest.advanceTimersByTime(1000);
  });
  expect(result.current).toMatchInlineSnapshot(`
    Array [
      2020-03-22T13:22:02.000Z,
      2020-03-22T13:22:02.000Z,
      1000,
    ]
  `);
});

test("fixed time is valid", () => {
  act(() => {
    advanceTo(new Date(date).setSeconds(0, 800));
  });
  const { result } = renderHook(() => useSeconds());

  expect(result.current).toMatchInlineSnapshot(`
    Array [
      2020-03-22T13:22:01.000Z,
      2020-03-22T13:22:00.800Z,
      1200,
    ]
  `);

  act(() => {
    advanceTo(new Date(date).setSeconds(1, 995));
    jest.advanceTimersByTime(result.current[2]);
  });
  expect(result.current).toMatchInlineSnapshot(`
    Array [
      2020-03-22T13:22:02.000Z,
      2020-03-22T13:22:01.995Z,
      1005,
    ]
  `);

  act(() => {
    advanceTo(new Date(date).setSeconds(2, 997));
    jest.advanceTimersByTime(result.current[2]);
  });
  expect(result.current).toMatchInlineSnapshot(`
    Array [
      2020-03-22T13:22:03.000Z,
      2020-03-22T13:22:02.997Z,
      1003,
    ]
  `);

  act(() => {
    advanceTo(new Date(date).setSeconds(4, 200));
    jest.advanceTimersByTime(result.current[2]);
  });
  expect(result.current).toMatchInlineSnapshot(`
    Array [
      2020-03-22T13:22:04.000Z,
      2020-03-22T13:22:04.200Z,
      800,
    ]
  `);
});

test("delay arg", () => {
  act(() => {
    advanceTo(new Date(date).setSeconds(0, 800));
  });
  const { result } = renderHook(() => useSeconds(123));

  expect(result.current).toMatchInlineSnapshot(`
    Array [
      2020-03-22T13:22:01.123Z,
      2020-03-22T13:22:00.800Z,
      1323,
    ]
  `);

  act(() => {
    advanceTo(new Date(date).setSeconds(2, 118));
    jest.advanceTimersByTime(result.current[2]);
  });
  expect(result.current).toMatchInlineSnapshot(`
    Array [
      2020-03-22T13:22:02.123Z,
      2020-03-22T13:22:02.118Z,
      1005,
    ]
  `);

  act(() => {
    advanceTo(new Date(date).setSeconds(3, 120));
    jest.advanceTimersByTime(result.current[2]);
  });
  expect(result.current).toMatchInlineSnapshot(`
    Array [
      2020-03-22T13:22:03.123Z,
      2020-03-22T13:22:03.120Z,
      1003,
    ]
  `);

  act(() => {
    advanceTo(new Date(date).setSeconds(4, 323));
    jest.advanceTimersByTime(result.current[2]);
  });
  expect(result.current).toMatchInlineSnapshot(`
    Array [
      2020-03-22T13:22:04.123Z,
      2020-03-22T13:22:04.323Z,
      800,
    ]
  `);
});
