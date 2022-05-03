import { Config } from '../utils'
import { num } from './num'
import { trueOrFalse } from './boolean'

/**
 * Providing a value from the list
 * @param config {Object}
 * @param config.list - list of values
 * @param config.nullable - result can be null
 */
export const oneOf = <T>(config: Config<{ list: ArrayLike<T>; }>): T =>
{
    if (config.nullable)
        if (trueOrFalse()) return null

    return config.list[num({ min: 0, max: config.list.length - 1 })]
}
