import { trueOrFalse } from '../primitives/boolean'
import { Nullable, nullable } from '../utils'

export type ReplicateConfig<R> = {
    /**
     * The size of resulting array
     */
    size: number;
    /**
     * Map function
     */
    schema: (index: number) => R;
}
export function replicate<R>(config: ReplicateConfig<R>): Array<R>
export function replicate<R>(config: Nullable<ReplicateConfig<R>, false>): Array<R>
export function replicate<R>(config: Nullable<ReplicateConfig<R>>): Array<R> | null
/**
 * Generates an array of values from schema (like a second parameter of Array.from)
 */
export function replicate<R>(config: ReplicateConfig<R> | Nullable<ReplicateConfig<R>>): Array<R> | null
{
    if (nullable(config)) if (trueOrFalse()) return null

    return Array.from(
        Array(config.size),
        (_, i) => config.schema(i),
    )
}
