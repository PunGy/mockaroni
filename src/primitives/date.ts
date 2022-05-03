import { Nullable, nullable } from '../utils'
import { num } from './num'
import { trueOrFalse } from './boolean'

export type DateConfig = {
    /**
     * Start point of date
     */
    min: Date;

    /**
     * End point of date
     */
    max: Date;
}
export function date(config: DateConfig): Date
export function date(config: Nullable<DateConfig, false>): Date
export function date(config: Nullable<DateConfig>): Date | null

/**
 * Generates a random date
 */
export function date(config: DateConfig | Nullable<DateConfig>): Date | null
{
    if (nullable(config)) if (trueOrFalse()) return null

    return new Date(
        num({ min: config.min.getTime(), max: config.max.getTime() }),
    )
}
