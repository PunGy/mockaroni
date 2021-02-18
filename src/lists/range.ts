import { Config, trueOrFalse } from '../utils'

export const range = (config: Config<{ from: number; to: number; }>): Array<number> =>
{
    if (config.nullable) if (trueOrFalse()) return null

    return Array.from(
        Array(config.to - config.from),
        (_, i) => config.from + i,
    )
}
