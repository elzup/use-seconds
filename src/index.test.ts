import { act, renderHook, cleanup } from "@testing-library/react-hooks"
import { useSeconds } from "."

const date = "2020-01-01T00:00:00.000Z"

beforeAll(() => jest.useFakeTimers())
afterAll(jest.useRealTimers)

afterEach(cleanup)

test("updates every second", async () => {
  act(() => {
    jest.setSystemTime(new Date(date).setSeconds(0, 0))
  })

  const { result } = renderHook(() => useSeconds())

  expect(result.current).toMatchInlineSnapshot(`
    [
      2020-01-01T00:00:00.000Z,
      2020-01-01T00:00:00.000Z,
      1000,
    ]
  `)

  // Fast-forward 1 sec
  act(() => {
    jest.advanceTimersByTime(1000)
  })

  expect(result.current).toMatchInlineSnapshot(`
    [
      2020-01-01T00:00:01.000Z,
      2020-01-01T00:00:01.000Z,
      1000,
    ]
  `)

  // Fast-forward 1 sec
  act(() => {
    jest.advanceTimersByTime(1000)
  })
  expect(result.current).toMatchInlineSnapshot(`
    [
      2020-01-01T00:00:02.000Z,
      2020-01-01T00:00:02.000Z,
      1000,
    ]
  `)
})

test("fixed time is valid", () => {
  act(() => {
    jest.setSystemTime(new Date(date).setSeconds(0, 800))
  })
  const { result } = renderHook(() => useSeconds())

  expect(result.current).toMatchInlineSnapshot(`
    [
      2020-01-01T00:00:00.000Z,
      2020-01-01T00:00:00.800Z,
      200,
    ]
  `)

  act(() => {
    jest.setSystemTime(new Date(date).setSeconds(1, 995 - 200))
    jest.advanceTimersByTime(200)
  })
  expect(result.current).toMatchInlineSnapshot(`
    [
      2020-01-01T00:00:02.000Z,
      2020-01-01T00:00:01.995Z,
      1005,
    ]
  `)

  act(() => {
    jest.setSystemTime(new Date(date).setSeconds(2, 997 - 1005))
    jest.advanceTimersByTime(1005)
  })
  expect(result.current).toMatchInlineSnapshot(`
    [
      2020-01-01T00:00:03.000Z,
      2020-01-01T00:00:02.997Z,
      1003,
    ]
  `)

  act(() => {
    jest.setSystemTime(new Date(date).setSeconds(4, 200 - 1003))
    jest.advanceTimersByTime(1003)
  })
  expect(result.current).toMatchInlineSnapshot(`
    [
      2020-01-01T00:00:04.000Z,
      2020-01-01T00:00:04.200Z,
      800,
    ]
  `)
})

test("delay arg", () => {
  act(() => {
    jest.setSystemTime(new Date(date).setSeconds(0, 800))
  })
  const { result } = renderHook(() => useSeconds(123))

  expect(result.current).toMatchInlineSnapshot(`
    [
      2020-01-01T00:00:00.123Z,
      2020-01-01T00:00:00.800Z,
      323,
    ]
  `)

  act(() => {
    jest.setSystemTime(new Date(date).setSeconds(2, 118 - 323))
    jest.advanceTimersByTime(323)
  })
  expect(result.current).toMatchInlineSnapshot(`
    [
      2020-01-01T00:00:02.123Z,
      2020-01-01T00:00:02.118Z,
      1005,
    ]
  `)

  act(() => {
    jest.setSystemTime(new Date(date).setSeconds(3, 120 - 1005))
    jest.advanceTimersByTime(1005)
  })
  expect(result.current).toMatchInlineSnapshot(`
    [
      2020-01-01T00:00:03.123Z,
      2020-01-01T00:00:03.120Z,
      1003,
    ]
  `)

  act(() => {
    jest.setSystemTime(new Date(date).setSeconds(4, 323 - 1003))
    jest.advanceTimersByTime(1003)
  })
  expect(result.current).toMatchInlineSnapshot(`
    [
      2020-01-01T00:00:04.123Z,
      2020-01-01T00:00:04.323Z,
      800,
    ]
  `)
})

test("start with back time", () => {
  act(() => {
    jest.setSystemTime(new Date(date).setSeconds(1, 800))
  })
  const { result } = renderHook(() => useSeconds())

  expect(result.current).toMatchInlineSnapshot(`
    [
      2020-01-01T00:00:01.000Z,
      2020-01-01T00:00:01.800Z,
      200,
    ]
  `)
})

test("every minutes", () => {
  act(() => {
    jest.setSystemTime(new Date(date).setMinutes(0, 45, 0))
  })
  const { result } = renderHook(() => useSeconds(10000, 60 * 1000))

  expect(result.current).toMatchInlineSnapshot(`
    [
      2020-01-01T00:00:10.000Z,
      2020-01-01T00:00:45.000Z,
      25000,
    ]
  `)

  act(() => {
    jest.setSystemTime(new Date(date).setMinutes(0, 59, 999 - 25000))
    jest.advanceTimersByTime(25000)
  })
  expect(result.current).toMatchInlineSnapshot(`
    [
      2020-01-01T00:01:10.000Z,
      2020-01-01T00:00:59.999Z,
      70001,
    ]
  `)

  act(() => {
    jest.setSystemTime(new Date(date).setMinutes(2, 20, 0 - 70001))
    jest.advanceTimersByTime(70001)
  })
  expect(result.current).toMatchInlineSnapshot(`
    [
      2020-01-01T00:02:10.000Z,
      2020-01-01T00:02:20.000Z,
      50000,
    ]
  `)
})
