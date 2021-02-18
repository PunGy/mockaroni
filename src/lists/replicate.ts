import { Config, trueOrFalse } from '@src/utils'

export const replicate = <R>(config: Config<{ size: number; schema: (index: number) => R; }>): Array<R> =>
{
    if (config.nullable) if (trueOrFalse()) return null

    return Array.from(
        Array(config.size),
        (_, i) => config.schema(i),
    )
}
