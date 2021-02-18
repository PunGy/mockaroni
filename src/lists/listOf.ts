import { Config, trueOrFalse } from '@src/utils'
import { oneOf } from '@src/primitives/oneOf'

export const listOf = <T>(config: Config<{ size: number; list: Array<T>; }>): Array<T> =>
{
    if (config.nullable) if (trueOrFalse()) return null

    return Array.from(
        Array(config.size),
        () => oneOf(config),
    )
}
