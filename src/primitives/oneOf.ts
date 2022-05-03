import { ArrayElementsType, Nullable, nullable } from '../utils'
import { num } from './num'
import { trueOrFalse } from './boolean'

export type OneOfReturnValue<T> = ArrayElementsType<ArrayLike<T>>

export type OneOfConfig<T> = {
    /**
     * List of values
     */
    list: ArrayLike<T>;
}
export function oneOf<T>(config: OneOfConfig<T>): OneOfReturnValue<T>
export function oneOf<T>(config: Nullable<OneOfConfig<T>, false>): OneOfReturnValue<T>
export function oneOf<T>(config: Nullable<OneOfConfig<T>>): OneOfReturnValue<T> | null

/**
 * Providing a value from the list
 */
export function oneOf<T>(config: OneOfConfig<T> | Nullable<OneOfConfig<T>>): OneOfReturnValue<T> | null
{
    if (nullable(config))
        if (trueOrFalse()) return null

    return config.list[num({ min: 0, max: config.list.length - 1 })]
}
