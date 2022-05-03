import { oneOf } from './oneOf'
import { nullable, Nullable } from '../utils'
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
    /**
     * Which characters would be in a string
     *
     * Default: 'alpha'
     */
    type?: 'alpha'|'numeric'|'alphanumeric';

    /**
     * Alphabet of a string
     *
     * Default: 'latin'
     */
    locale?: 'cyrillic'|'latin';

    /**
     * Case of string
     *
     * Default: 'lowercase'
     */
    format?: 'capitalized'|'lowercase'|'uppercase'|'mixed';

    /**
     * The size of resulting string
     * Required
     */
    size: number;
}
export function str(config: StringConfig): string
export function str(config: Nullable<StringConfig, false>): string
export function str(config: Nullable<StringConfig>): string | null
/**
 * Generates a random string
 */
export function str(config: StringConfig | Nullable<StringConfig>): string | null
{
    if (nullable(config)) if (trueOrFalse()) return null
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
