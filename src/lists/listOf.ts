import { Config } from '../utils'
import { oneOf } from '../primitives/oneOf'
import { trueOrFalse } from '../primitives/boolean'

/**
 * Generates an array of provided values from list param
 * @param config {Object}
 * @param config.size - the size of resulting array
 * @param config.list - list of values which resulting array will contain
 * @param config.nullable - result can be null
 */
export const listOf = <T>(config: Config<{ size: number; list: Array<T>; }>): Array<T> =>
{
    if (config.nullable) if (trueOrFalse()) return null

    return Array.from(
        Array(config.size),
        () => oneOf({ ...config, nullable: false }),
    )
}
