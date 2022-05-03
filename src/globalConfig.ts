export type MockaroniConfig = {
    /**
     * Randomization function
     */
    random: () => number;
}
export const globalConfig = {
    random: Math.random,
}

export const setConfig = (nextConfig: MockaroniConfig) =>
{
    Object.assign(globalConfig, nextConfig)
}
