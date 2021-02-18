import { Config, trueOrFalse } from '../utils'

export const num = (config: Config<{ min: number; max: number; type?: 'float'|'int'; }>) =>
{
    if (config.nullable)
        if (trueOrFalse()) return null
    const rand = Math.random() * (config.max - config.min) + config.min
    return config.type === 'float' ? rand : Math.round(rand)
}
