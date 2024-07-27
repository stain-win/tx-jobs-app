import { ObjectUtil } from './object.util';
import { StringUtil } from './string.util';

const urlEncoder = {

    encodeKey (key: string) {

        return encodeURIComponent(key);
    },

    encodeValue (value: string) {

        return encodeURIComponent(value);
    },
};

/**
 * A utility class for generating URL query strings
 */
export class QueryParameterUtil {

    /**
     * Create a query string from a parameter object
     *
     * This method creates a query string from a simple JavaScript object, using the object keys
     * as query parameter names and encoding their values. Arrays will be encoded as multiple values
     * and Date instances will be encoded as timestamps. Accepts an optional keyCase parameter which
     * allows to transform the letter casing of the object keys to query parameters, i.e. camelCase
     * object keys to snakeCase query parameters.
     *
     * @usage
     * ```
     * QueryParameterUtil.createQueryString({
     *     searchTerm  : 'foo',
     *     searchFields: ['foo', 'bar'],
     *     searchDate  : new Date('1/1/1971')
     * }, StringUtil.LetterCase.snakeCase));
     *
     * // will generate the string: 'search_term=foo&search_fields=foo&search_fields=bar&search_date=31532400000'
     * ```
     *
     * @param params    The object containing the parameters to encode
     * @param keyCase   An optional letter casing for transforming parameter names (eg. camel case to snake case)
     * @returns         The query string representing the parameter object
     */
    static createQueryString (params: QueryParameterUtil.QueryParameters,
                              keyCase?: StringUtil.LetterCase | undefined): string {

        return Object.keys(ObjectUtil.excludeUndefined(params)).reduce((query: string[], key) => {

            query.push(this.encodeParam(key, params[key], keyCase));

            return query;

        }, []).join('&');
    }

    /**
     * Encode a key-value pair as a query parameter
     *
     * @param key       The object key to transform
     * @param value     The value of the key
     * @param keyCase   An optional letter casing for transforming the object key
     * @returns         A string representing the key-value pair
     */
    static encodeParam (key: string,
                        value: QueryParameterUtil.QueryParameter,
                        keyCase?: StringUtil.LetterCase): string {

        const param = [];

        if (value instanceof Array && value.length) {

            value.forEach((val) => {

                param.push([this.encodeKey(key, keyCase), this.encodeValue(val)].join('='));
            });

        } else {

            param.push([this.encodeKey(key, keyCase), this.encodeValue(value)].join('='));
        }

        return param.join('&');
    }

    /**
     * Encode an object key as a query parameter name
     *
     * @param key       The object key to transform
     * @param keyCase   An optional letter casing for transforming the object key
     * @returns         A string representing the object key
     */
    static encodeKey (key: string,
                      keyCase?: StringUtil.LetterCase | null): string {

        return urlEncoder.encodeKey(StringUtil.transform(key, keyCase));
    }

    /**
     * Encode a value as a query parameter value
     *
     * @param value The value to encode
     * @returns     A string representing the value
     */
    static encodeValue (value: QueryParameterUtil.QueryParameter): string {

        if (value === null || value === undefined) {

            value = '';
        }

        if (value instanceof Date) {

            value = value.getTime();
        }

        return urlEncoder.encodeValue(value.toString());
    }
}

/**
 * A namespace for our custom types
 */
// tslint:disable-next-line:no-namespace
export namespace QueryParameterUtil {

    export type Primitive = boolean | string | number | null | undefined;

    export type QueryParameter = Primitive | Date | Array<Primitive | Date>;

    export interface QueryParameters {
        [key: string]: QueryParameter;
    }
}
