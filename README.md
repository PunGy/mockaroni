# Mockaroni

[![codecov](https://codecov.io/gh/PunGy/mockaroni/branch/main/graph/badge.svg)](https://codecov.io/gh/PunGy/mockaroni)
[![npm](https://img.shields.io/npm/dt/mockaroni.svg)](https://www.npmjs.com/package/mockaroni) [![npm](https://img.shields.io/npm/v/mockaroni.svg)](https://www.npmjs.com/package/mockaroni)
[![npm](https://img.shields.io/bundlephobia/min/mockaroni)](https://bundlephobia.com/result?p=mockaroni) [![node-current](https://img.shields.io/node/v/mockaroni)](https://www.npmjs.com/package/mockaroni)

`mockaroni` is a tool for fast generating mock javascript entities.

# Usage

See [documentation](https://pungy.github.io/mockaroni/)

Input:
```ts
import { replicate, str, num, oneOf, date, listOf, text } from 'mockaroni'

interface Worker
{
    name: string;
    age: number;
    position: 'manager' | 'director' | 'clerk';
    dateOfEmployment: Date;
    achievements: Array<'owl' | 'hard worker' | 'coffee lower' | 'gambler'> | null;
    place: {
        officeId: string;
        floor: number;
    };
    biography: string;
}

// Spawn 100 workers schema
const workers: Array<Worker> = replicate({
    size: 100,
    schema: () => ({
        // Spawn capitalized string of chars with size in range of 4 to 8
        name: text({ size: 1, type: 'names' }),

        // Spawn number from 15 to 90
        age: num({ min: 15, max: 90 }),

        // Select on of the options provided in list
        position: oneOf({ list: ['manager', 'director', 'clerk'] as const }),

        // Spawn date in selected edges
        dateOfEmployment: date({ min: new Date('2018'), max: new Date('2020') }),

        // Spawn list of achievements. Count of achievements can be from 1 to 4, or null
        achievements: listOf({
            list: ['owl', 'hard worker', 'coffee lower', 'gambler'] as const,
            size: num({ min: 1, max: 4 }),
            nullable: true,
        }),

        place: {
            // Spawn 10 length alphanumeric string
            officeId: str({ type: 'alphanumeric', size: 10 }),
            // Spawn number from 1 to 20
            floor: num({ min: 1, max: 20 }),
        },

        // Generate text with 10-30 words
        biography: text({ size: num({ min: 10, max: 30 }) }),
    }),
})

console.log(workers)
```

output:
```js
[
    {
        name: 'Annie',
        age: 74,
        position: 'manager',
        dateOfEmployment: 2019-10-24T11:20:41.367Z,
        achievements: [ 'hard worker', 'hard worker', 'hard worker' ],
        place: { officeId: 'eg2wqrm3q5', floor: 17 },
        biography: 'muddle abandoned clear stupid obtainable earn arm lumber nostalgic race toothsome reflective offer identify tow woozy butter parcel smile dapper tow shivering'
    },
    {
        name: 'Lachlan',
        age: 74,
        position: 'clerk',
        dateOfEmployment: 2018-07-01T14:04:21.348Z,
        achievements: null,
        place: { officeId: '92b687038k', floor: 7 },
        biography: 'raise frightened word learned shame hellish sleep sheep direful cable absurd'
    },
    {
        name: 'Hamzah',
        age: 49,
        position: 'director',
        dateOfEmployment: 2019-01-24T22:33:43.132Z,
        achievements: null,
        place: { officeId: 'jfscywmz4n', floor: 19 },
        biography: 'parcel magic craven identify frightened mint toothsome zippy protect huge shivering sea clever rat actually filthy kittens'
    },
    ...
]
```

# Install

Library can be install via packet manager like npm or yarn
```shell
yarn add mockaroni
```
or
```shell
npm install mockaroni
```

Then, you can import it like commonjs or es6 import
```js
import { num, text } from 'mockaroni'
// or
const { num, text } = require('mockaroni')
```

### Browser

You also can add it as a script like this
```html
<script src="https://cdn.jsdelivr.net/gh/pungy/mockaroni@v1.0.0/web-bundle/index.js"></script>
```
Or like a module script (notice that its different files)
```html
<script type="module" src="https://cdn.jsdelivr.net/gh/pungy/mockaroni@v1.0.0/web-bundle/index.mjs"></script>
```
