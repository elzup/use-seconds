# use-seconds

[![NPM](https://img.shields.io/npm/v/use-seconds.svg)](https://www.npmjs.com/package/use-seconds) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Seconds interval time for React

this timer is Keep adjusting `setTimeout` timing and return **adjusted Time**.

```
round(01:00:53.011Z) => 01:00:53.000Z
round(01:00:53.998Z) => 01:00:54.000Z
```

[DEMO use\-seconds\-example \- CodeSandbox](https://codesandbox.io/s/use-seconds-example-w875w)

## Install

```bash
npm install --save use-seconds
```

## Usage

```tsx
import * as React from "react"

import { useSeconds } from "use-seconds"

const Example = () => {
  const [time, eventTime, nextMs] = useSeconds() // Date object
  return (
    <div>
      <p>{time.toISOString()}</p>
      <p>{eventTime.toISOString()}</p>
      <p>{next}</p>
      {/*
        2023-05-24T01:12:53.000Z
        2023-05-24T01:12:53.011Z
        989
       */}
    </div>
  )
}
```

**Rounding Time**

```
10.995 s → return 11.000 s
↓ setTimeout 1005 (ms)
12.003 s → return 12.000 s
↓ setTimeout 997 (ms)
```

## License

MIT © [elzup](https://github.com/elzup)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
