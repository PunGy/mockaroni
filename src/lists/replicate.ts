import { Config } from '../utils'
import { trueOrFalse } from '../primitives/boolean'

/**
 * Generates an array of values from schema (like a second parameter of Array.from)
 * @param config {Object}
 * @param config.size - the size of resulting array
 * @param config.schema - map function
 * @param config.nullable - result can be null
 */
export const replicate = <R>(config: Config<{ size: number; schema: (index: number) => R; }>): Array<R> =>
{
    if (config.nullable) if (trueOrFalse()) return null

    return Array.from(
        Array(config.size),
        (_, i) => config.schema(i),
    )
}
