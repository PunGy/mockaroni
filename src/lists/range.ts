import { nullable, Nullable } from '../utils'
import { trueOrFalse } from '../primitives/boolean'

export type RangeConfig = {
    /**
     * Start point of numbers in the range
     */
    from: number;

    /**
     * End point of numbers in the range
     */
    to: number;
}

export function range(listOf: number): Array<number>;
export function range(listOf: RangeConfig): Array<number>;
export function range(config: Nullable<RangeConfig>): Array<number> | null
/**
 * Generates a range of integers
 */
export function range(config: RangeConfig | Nullable<RangeConfig> | number): Array<number> | null
{
    if (typeof config === 'number') config = { from: 0, to: config }
    if (nullable(config)) if (trueOrFalse()) return null

    return Array.from(
        Array(config.to - config.from),
        (_, i) => (config as RangeConfig).from + i,
    )
}
