import { oneOf } from './oneOf'
import { Config } from '../utils'
import { trueOrFalse } from './boolean'

const alphabets = {
    latin: {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        get capitalized()
        {
            return this.lowercase
        },
        get mixed()
        {
            return this.lowercase + this.uppercase
        },
    },
    cyrillic: {
        uppercase: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
        lowercase: 'абвгдеёжзийклмнопрстуфхцчшщэюя',
        get capitalized()
        {
            return this.lowercase
        },
        get mixed()
        {
            return this.lowercase + this.uppercase
        },
    },
    /**
     * Since in alphanumeric type we are using both alphabet and number
     * We need to duplicate numbers to be relativity compatible by size with language alphabets
     */
    numbers: '000111222333444555666777888999',
}

export type StringConfig = {
    type?: 'alpha'|'numeric'|'alphanumeric';
    locale?: 'cyrillic'|'latin';
    format?: 'capitalized'|'lowercase'|'uppercase'|'mixed';
    size: number;
}
/**
 * Generates a random string
 * @param config {Object}
 * @param config.size - the size of resulting string
 * @param config.type - which characters would be in a string
 * @param config.locale - alphabet of a string
 * @param config.format - case of string
 * @param config.nullable - result can be null
 */
export const str = (config: Config<StringConfig>): string | null =>
{
    if (config.nullable) if (trueOrFalse()) return null
    config.locale ??= 'latin'
    config.format ??= 'lowercase'
    config.type ??= 'alpha'

    let result = ''
    const alphabet = config.type === 'numeric'
        ? alphabets.numbers
        : config.type === 'alpha'
            ? alphabets[config.locale][config.format]
            : alphabets[config.locale][config.format] + alphabets.numbers

    const length = config.size
    for ( let i = 0; i < length; i++ )
    {
        result += oneOf({ list: alphabet })
        if (config.format === 'capitalized' && i === 0) result = result.toUpperCase()
    }
    return result
}
