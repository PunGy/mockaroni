export type Config<T extends Record<string, any> = Record<string, any>> = T & { nullable?: boolean; }

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

const trueOrFalse = () => Boolean(Math.round(Math.random()))

export const num = (config: Config<{ min: number; max: number; type?: 'float'|'int'; }>) =>
{
    if (config.nullable)
        if (trueOrFalse) return null
    const rand = Math.random() * (config.max - config.min) + config.min
    return config.type === 'float' ? rand : Math.round(rand)
}

const alphabets = {
    en: {
        capitalized: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        normal: 'abcdefghijklmnopqrstuvwxyz',
        length: 25, // 0-25
    },
    ru: {
        capitalized: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
        normal: 'абвгдеёжзийклмнопрстуфхцчшщэюя',
        length: 29, // 0-29
    },
    numbers: '0123456789',
}
export const str = (config: Config<{
    type?: 'alpha'|'numeric'|'alphanumeric';
    locale?: 'ru'|'en';
    format?: 'capitalized'|'normal';
    size: {
        min: number; // default 4
        max: number; // default 15
    } | number;
}>): string | null =>
{
    if (config.nullable) if (trueOrFalse()) return null
    config.locale = config.locale ?? 'en'
    config.format = config.format ?? 'normal'

    let result = ''
    const alphabet = config.type === 'numeric'
        ? alphabets.numbers
        : config.type === 'alpha'
            ? alphabets[config.locale][config.format]
            : alphabets[config.locale][config.format] + alphabets.numbers

    const length = typeof config.size === 'number' ? config.size : num(config.size)
    for ( let i = 0; i < length; i++ )
    {
        result += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
    }
    return result
}

export const oneOf = <T>(config: Config<{ list: Array<T>; }>): T =>
{
    if (config.nullable)
        if (trueOrFalse) return null

    return config.list[num({ min: 0, max: config.list.length - 1 })]
}
