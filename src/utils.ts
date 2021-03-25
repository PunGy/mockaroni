export type Config<T extends Record<string, any> = Record<string, any>> = T & { nullable?: boolean; }

export const trueOrFalse = () => Boolean(Math.round(Math.random()))
