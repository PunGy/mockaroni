# Mockaroni

[![codecov](https://codecov.io/gh/PunGy/mockaroni/branch/main/graph/badge.svg)](https://codecov.io/gh/PunGy/mockaroni)
[![npm](https://img.shields.io/npm/dt/mockaroni.svg)](https://www.npmjs.com/package/mockaroni) [![npm](https://img.shields.io/npm/v/mockaroni.svg)](https://www.npmjs.com/package/mockaroni)
[![npm](https://img.shields.io/bundlephobia/min/mockaroni)](https://bundlephobia.com/result?p=mockaroni) [![node-current](https://img.shields.io/node/v/mockaroni)](https://www.npmjs.com/package/mockaroni)

`mockaroni` is a tool for fast generating mock javascript entities.

### Usage

Input:
```ts
import { replicate, str, num, oneOf, date, listOf } from './mockaroni'

interface Worker
{
    name: string;
    age: number;
    position: 'manager' | 'director' | 'clerk';
    dateOfEmployment: Date;
    achievements?: Array<'owl' | 'hard worker' | 'coffee lower' | 'gambler'>;
    place: {
        officeId: string;
        floor: number;
    };
}

// Spawn 100 workers schema
const workers: Array<Worker> = replicate({
    size: 100,
    schema: () => ({
        // Spawn capitalized string of chars with size in range of 4 to 8
        name: str({ format: 'capitalized', type: 'alpha', size: 1 })
            + str({ format: 'normal', type: 'alpha', size: num({ min: 4, max: 8 }) }),

        // Spawn number from 15 to 90
        age: num({ min: 15, max: 90 }),

        // Select on of the options provided in list
        position: oneOf({ list: ['manager', 'director', 'clerk'] }),

        // Spawn date in selected edges
        dateOfEmployment: date({ min: new Date('2018'), max: new Date('2020') }),

        // Spawn list of achievements. Count of achievements can be from 1 to 4, or null
        achievements: listOf({
            list: ['owl', 'hard worker', 'coffee lower', 'gambler'],
            size: num({ min: 1, max: 4 }),
            nullable: true,
        }),

        place: {
            // Spawn 10 length alphanumeric string
            officeId: str({ type: 'alphanumeric', size: 10 }),
            // Spawn number from 1 to 20
            floor: num({ min: 1, max: 20 }),
        },
    }),
})

console.log(workers)
```

output:
```js
[
    {
        name: 'Yphnad',
        age: 27,
        position: 'clerk',
        dateOfEmployment: 2018-10-13T15:00:00.712Z,
        achievements: null,
        place: { officeId: '6fm4g5049d', floor: 6 }
    },
    {
        name: 'Yztxrypdo',
        age: 28,
        position: 'director',
        dateOfEmployment: 2019-07-17T17:25:41.517Z,
        achievements: [ 'owl', 'coffee lower' ],
        place: { officeId: 'rbs10v5d4j', floor: 7 }
    },
    ...
]
```
