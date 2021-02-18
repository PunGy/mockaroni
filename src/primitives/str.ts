import { num } from '@src/index'
import { Config, trueOrFalse } from '@src/utils'

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
