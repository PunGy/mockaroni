import { replicate, str, num, oneOf, date, listOf, text } from '../src/index'

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

        biography: text({ size: num({ min: 10, max: 30 }) }),
    }),
})

console.log(workers)
