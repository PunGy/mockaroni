export type Config<T extends Record<string, any> = Record<string, any>> = T & { nullable?: boolean; }

export function assignSoft<T, U>(target: T, source: U): T & U;
export function assignSoft<T, U, V>(target: T, source1: U, source2: V): T & U & V;
export function assignSoft<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
export function assignSoft(target: Record<any, any>, sources: Array<Record<any, any>>): Record<any, any>;
/**
 * Analog of Object.assign. Will write only those values from the source, which is not represented in target
 * Also working for nested object (expect arrays)
 */
export function assignSoft(target: Record<any, any>, ...sources: Array<Record<any, any>>)
{
    sources.forEach(obj =>
    {
        for (const key in obj)
        {
            if (Object.prototype.hasOwnProperty.call(obj, key))
            {
                if (target[key] == null)
                {
                    target[key] = obj[key]
                }
                // Only non array-like objects must be soft assigned
                else if (typeof target[key] === 'object' && target[key].length == null)
                {
                    assignSoft(target[key], obj[key])
                }
            }
        }
    })

    return target
}

export const capitalize = (str: string) => str.length > 0 ? str[0].toUpperCase() + str.slice(1) : ''