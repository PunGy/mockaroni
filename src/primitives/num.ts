import { Config } from '../utils'
import { trueOrFalse } from './boolean'

/**
 * Generates a random number
 * @param config {Object}
 * @param config.min - low border of numbers
 * @param config.max - high border of numbers
 * @param config.type - would a result number be an integer or float
 * @param config.nullable - result can be null
 */
export const num = (config: Config<{ min: number; max: number; type?: 'float'|'int'; }>) =>
{
    if (config.nullable)
        if (trueOrFalse()) return null
    const rand = Math.random() * (config.max - config.min) + config.min
    return config.type === 'float' ? rand : Math.round(rand)
}
