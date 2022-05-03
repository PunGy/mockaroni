import { ArrayElementsType, Nullable, nullable } from '../utils'
import { oneOf } from '../primitives/oneOf'
import { trueOrFalse } from '../primitives/boolean'

export type ListOfReturnValue<T> = Array<ArrayElementsType<ArrayLike<T>>>;

export type ListOfConfig<T> = {
    /**
     * The size of resulting array
     */
    size: number;

    /**
     * List of values which resulting array will contain
     */
    list: ArrayLike<T>;
}
export function listOf<T>(config: ListOfConfig<T>): ListOfReturnValue<T>
export function listOf<T>(config: Nullable<ListOfConfig<T>, false>): ListOfReturnValue<T>
export function listOf<T>(config: Nullable<ListOfConfig<T>>): ListOfReturnValue<T> | null

/**
 * Generates an array of provided values from list param
 */
export function listOf<T>(config: ListOfConfig<T> | Nullable<ListOfConfig<T>>): ListOfReturnValue<T> | null
{
    if (nullable(config)) if (trueOrFalse()) return null

    return Array.from(
        Array(config.size),
        () => oneOf({ ...config, nullable: false }),
    )
}
