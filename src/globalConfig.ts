export type MockaroniConfig = {
    /**
     * Randomization function
     */
    random: () => number;
}
export const globalConfig: MockaroniConfig = {
    random: Math.random,
}

export const setConfig = (nextConfig: MockaroniConfig) =>
{
    Object.assign(globalConfig, nextConfig)
}
