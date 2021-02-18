import { Config, trueOrFalse } from '@src/utils'
import { num } from '@src/primitives/num'

export const oneOf = <T>(config: Config<{ list: Array<T>; }>): T =>
{
    if (config.nullable)
        if (trueOrFalse()) return null

    return config.list[num({ min: 0, max: config.list.length - 1 })]
}
