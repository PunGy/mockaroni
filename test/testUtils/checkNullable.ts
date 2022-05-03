import * as boolean from '@src/primitives/boolean'
import * as utils from '@src/utils'

export const checkNullable = <T, R>(target: (config: utils.Config<T>) => R, config: T) => () =>
{
    jest.spyOn(boolean, 'trueOrFalse').mockImplementationOnce(() => true)
    const nullResult = target({ nullable: true, ...config })
    jest.spyOn(boolean, 'trueOrFalse').mockImplementationOnce(() => false)
    const nonNullResult = target({ nullable: true, ...config })

    expect(nullResult).toBeNull()
    expect(nonNullResult).not.toBeNull()
}

