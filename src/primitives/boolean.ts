import { globalConfig } from '../globalConfig'

/**
 * Returns true or false
 */
export const trueOrFalse = () => Boolean(Math.round(globalConfig.random()))