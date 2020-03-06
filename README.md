# use-seconds

[![NPM](https://img.shields.io/npm/v/use-seconds.svg)](https://www.npmjs.com/package/use-seconds) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Seconds interval time for React

this timer is Keep adjusting `setTimeout` timing and return **adjusted Time**.
[DEMO use\-seconds\-example \- CodeSandbox](https://codesandbox.io/s/use-seconds-example-w875w)

10.995 s → return 11.000 s
↓ setTimeout 1005 (ms)
12.003 s → return 12.000 s
↓ setTimeout 997 (ms)

## Install

```bash
npm install --save use-seconds
```

## Usage

```tsx
import * as React from "react";

import { useSeconds } from "use-seconds";

const Example = () => {
  const [date] = useSeconds(); // Date object
  return <td>{String(date.getSeconds())}</td>;
};
```

## License

MIT © [elzup](https://github.com/elzup)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
