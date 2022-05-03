import { globalConfig } from '../globalConfig'
import { Nullable, nullable } from '../utils'
import { trueOrFalse } from './boolean'

export type NumConfig = {
    /**
     * Low border of numbers
     */
    min: number;

    /**
     * High border of numbers
     */
    max: number;

    /**
     * Would a result number be an integer or float
     *
     * Default: 'int'
     */
    type?: 'float'|'int';
}
export function num(config: NumConfig): number
export function num(config: Nullable<NumConfig, false>): number
export function num(config: Nullable<NumConfig>): number | null

/**
 * Generates a random number
 */
export function num(config: NumConfig | Nullable<NumConfig>): number | null
{
    if (nullable(config))
        if (trueOrFalse()) return null
    const rand = globalConfig.random() * (config.max - config.min) + config.min
    return config.type === 'float' ? rand : Math.round(rand)
}

num({ min: 10, max: 20 })
