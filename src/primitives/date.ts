import { Config } from '../utils'
import { num } from './num'
import { trueOrFalse } from './boolean'

/**
 * Generates a random date
 * @param config {Object}
 * @param config.min - start point of date
 * @param config.max - end point of date
 * @param config.nullable - result can be null
 */
export const date = (config: Config<{ min: Date; max: Date; }>): Date =>
{
    if (config.nullable) if (trueOrFalse()) return null

    return new Date(
        num({ min: config.min.getTime(), max: config.max.getTime() }),
    )
}
