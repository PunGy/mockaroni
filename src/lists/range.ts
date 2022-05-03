import { Config } from '../utils'
import { trueOrFalse } from '../primitives/boolean'

export type RangeConfig = { from: number; to: number; }

export function range(listOf: number): Array<number>;
export function range(config: Config<RangeConfig>): Array<number>
/**
 * Generates a range of integers
 * @param config {Object} Could be a config object, or number (in this case, config object would be { from: 0, to: number })
 * @param config.from - start point of numbers in the range
 * @param config.to - end point of numbers in the range
 * @param config.nullable - result can be null
 */
export function range (config: Config<RangeConfig> | number): Array<number>
{
    if (typeof config === 'number') config = { from: 0, to: config }
    if (config.nullable) if (trueOrFalse()) return null

    return Array.from(
        Array(config.to - config.from),
        (_, i) => (config as RangeConfig).from + i,
    )
}
