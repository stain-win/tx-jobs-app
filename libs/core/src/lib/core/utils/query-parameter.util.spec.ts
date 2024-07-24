import { QueryParameterUtil } from './query-parameter.util';
import { StringUtil } from './string.util';

describe('QueryParameterUtil', () => {

    const util = QueryParameterUtil;

    it('should be exported', () => {

        expect(util).toBeTruthy();
    });

    it('should create query strings', () => {

        expect(util.createQueryString({
            searchTerm  : 'foo',
            searchFields: ['foo', 'bar'],
            searchDate  : new Date(31532400000),
        })).toBe('searchTerm=foo&searchFields=foo&searchFields=bar&searchDate=31532400000');

        expect(util.createQueryString({
            searchTerm  : 'foo',
            searchFields: ['foo', 'bar'],
            searchDate  : new Date(31532400000),
        }, StringUtil.LetterCase.snakeCase)).toBe('search_term=foo&search_fields=foo&search_fields=bar&search_date=31532400000');
    });

    it('should discard undefined values but keep empty values', () => {

        expect(util.createQueryString({
            foo: undefined,
            bar: null,
            baz: '',
            bam: [],
        })).toBe('bar=&baz=&bam=');
    });
});
