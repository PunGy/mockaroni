import { Config, trueOrFalse } from '../utils'
import { num } from '../primitives/num'

export const date = (config: Config<{ min: Date; max: Date; }>): Date =>
{
    if (config.nullable) if (trueOrFalse()) return null

    return new Date(
        num({ min: config.min.getTime(), max: config.max.getTime() }),
    )
}
