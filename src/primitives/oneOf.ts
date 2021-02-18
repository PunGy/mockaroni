import { Config, trueOrFalse } from '../utils'
import { num } from '../primitives/num'

export const oneOf = <T>(config: Config<{ list: Array<T>; }>): T =>
{
    if (config.nullable)
        if (trueOrFalse()) return null

    return config.list[num({ min: 0, max: config.list.length - 1 })]
}
