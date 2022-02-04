# Feature Flags

## Installation

### To use in browser

```
npm i fflags
```

```
yarn add fflags
```

### To use with node.js

```
npm i fflags node-fetch@2
```

```
yarn add fflags node-fetch@2
```

## Usage

```js
const { FeatureFlags } = require('fflags'); // Node.js CommonJS
import { FeatureFlags } from 'fflags'; // TypeScript ESModule

const SERVER_URL = 'https://yourserver.com';
const INSTANCE_NAME = 'instance-name';
const USER_EMAIL = 'test@example.com';

const flagStorage = new FeatureFlags(`${SERVER_URL}/client/${INSTANCE_NAME}/${USER_EMAIL}`);

async function main() {
  await flagsStorage.initialize(); // Fetch flags for specified instance and email

  console.log(flagsStorage.checkFlag('flag-name')); // true/false
  console.log(flagsStorage.flags); // [...]
}

main();
```

## Other parts of Feature Flags

- [Server](https://github.com/kliuiev-io/feature-flags/tree/master/server)
- [Admin dashboard](https://github.com/kliuiev-io/feature-flags/tree/master/client)
