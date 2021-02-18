export type Config<T extends Record<string, any> = Record<string, any>> = T & { nullable?: boolean; }

export const trueOrFalse = () => Boolean(Math.round(Math.random()))

export interface IMockaron {
    // Replicate schema N times
    replicate: <R>(config: Config<{ size: number; schema: () => R; }>) => Array<R>;
    // Generate number range
    range: (config: Config<{ from: number; to: number; }>) => Array<number>;
    // Same as oneOf, but generates array of provided values
    listOf: <T>(config: Config<{ size: number; list: Array<T>; }>) => Array<T>;


    num: (config: Config<{ min: number; max: number; type?: 'float'|'int'; }>) => number;
    // Random string
    str: (config: Config<{
        type: 'alpha'|'numeric'|'alphanumeric';
        size: {
            from: number; // default 4
            to: number; // default 15
        } | number;
    }>) => string;
    // Random date
    date: (config: Config<{ from: Date; to: Date; }>) => Date;

    // Real name
    name: (config?: Config) => string;
    // Avatar url, no real person
    avatar: (config?: Config) => string;

    // One of provided element from list
    oneOf: <T>(config: Config<{ list: Array<T>; }>) => T;
}
