import { num } from '@src/index'
import { Config, trueOrFalse } from '@src/utils'

const alphabets = {
    en: {
        capitalized: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        normal: 'abcdefghijklmnopqrstuvwxyz',
        get mixed()
        {
            return this.normal + this.capitalized
        },
    },
    ru: {
        capitalized: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
        normal: 'абвгдеёжзийклмнопрстуфхцчшщэюя',
        get mixed()
        {
            return this.normal + this.capitalized
        },
    },
    numbers: '000111222333444555666777888999', // duplicate number to be relativity compatible by size with language alphabets
}
export const str = (config: Config<{
    type?: 'alpha'|'numeric'|'alphanumeric';
    locale?: 'ru'|'en';
    format?: 'capitalized'|'normal'|'mixed';
    size: {
        min: number;
        max: number;
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
