# use-seconds

> Seconds interval time for React

[![NPM](https://img.shields.io/npm/v/use-seconds.svg)](https://www.npmjs.com/package/use-seconds) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-seconds
```

## Usage

```tsx
import * as React from "react";

import { useSeconds } from "use-seconds";

const Example = () => {
  const { time } = useSeconds();
  return <td>{String(time.getSeconds())}</td>;
};
```

## License

MIT © [elzup](https://github.com/elzup)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
