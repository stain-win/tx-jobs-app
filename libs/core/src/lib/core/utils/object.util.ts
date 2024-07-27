import {keyframes} from '@angular/animations';

export class ObjectUtil {

    static isEmpty (object: ObjectUtil.Hash): boolean {

        return Object.keys(object).length === 0;
    }

    /**
     * Removes keys from an object using a filter function
     *
     * @param object    The object to remove the keys from
     * @param filter    A filter method to match object keys or values
     * @returns         A new object with non-matching keys removed
     */
    static filter<T extends { [key: string]: unknown}> (object: T, filter: ObjectUtil.Filter): Partial<T> {

        return (Object.keys(object) as (keyof T)[])
            .filter(key => filter(key as string, object[key], object))
            .reduce((obj, key) => {
                (obj as T)[key] = object[key];
                return obj;
            }, {} as T);
    }

    /**
     * Removes keys from an object using a filter function
     *
     * @param object    The object to remove the keys from
     * @param filter    A filter method to match object keys or values
     * @returns         A new object with matching keys removed
     */
    static exclude<T extends { [key: string]: unknown}> (object: T, filter: ObjectUtil.Filter): Partial<T> {
        return this.filter(object, (key, value, obj) => !filter(key, value, obj));
    }

    /**
     * Removes all keys from the object, whose value is undefined
     */
    static excludeUndefined<T extends { [key: string]: unknown}> (object: T): Partial<T> {

        return this.exclude(object, (key, value, obj) => value === undefined);
    }

    /**
     * Removes all keys from the object, whose value is null
     */
    static excludeNull<T extends { [key: string]: unknown}> (object: T): Partial<T> {

        return this.exclude(object, (key, value, obj) => value === null);

    }

    /**
     * Removes all keys from the object, whose value is empty
     *
     * An empty value is considered to be undefined, null, '', [] or {}
     */
    static excludeEmpty<T extends { [key: string]: unknown}> (object: T): Partial<T> {

        return this.exclude(object, (key, value, obj) => {

            return value === undefined ||
                   value === null ||
                   value === '' ||
                   (value instanceof Array && value.length === 0) ||
                   (value.constructor === Object && Object.keys(value).length === 0);
        });

    }

    static objectToMap<T extends { [key: string]: unknown}> (object: T): Map<string, unknown> {
            return new Map(Object.entries(object));

    }

}

// tslint:disable-next-line:no-namespace
export namespace ObjectUtil {

    export type Filter = (key: string, value: any, object: { [key: string]: any }) => boolean;

    export interface Hash { [key: string]: any; }
}
