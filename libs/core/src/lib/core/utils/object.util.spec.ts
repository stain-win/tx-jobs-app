import { ObjectUtil } from './object.util';

const util = ObjectUtil;

describe('ObjectUtil', () => {

    it('should be exported', () => {

        expect(util).toBeTruthy();
    });

    it('should detect empty objects', () => {

        expect(util.isEmpty({})).toBeTruthy();
        expect(util.isEmpty({ foo: 'bar' })).toBeFalsy();
    });

    it('should determine if two objects are equal', () => {

        const objectA = {
            foo: 'bar',
            bar: false,
            baz: new Date('1/1/2000'),
        };

        const objectB = {
            foo: 'bar',
            bar: false,
            baz: new Date('1/1/2000'),
        };

        // this comparator ensures that we can compare date instances
        const comparator = (a: any, b: any) => (a instanceof Date && b instanceof Date) ? (a.getTime() === b.getTime()) : (a === b);

        expect(util.isEqual({}, {})).toBeTruthy();
        expect(util.isEqual({}, { foo: 'bar' })).toBeFalsy();
        expect(util.isEqual({ foo: 'bar' }, {})).toBeFalsy();
        expect(util.isEqual({ foo: 'bar', bar: false }, { foo: 'bar', bar: false })).toBeTruthy();

        // with the default comparator, the two dates are not equal
        expect(util.isEqual(objectA, objectB)).toBeFalsy();
        // with our custom comparator, we compare the date's timestamp
        expect(util.isEqual(objectA, objectB, comparator)).toBeTruthy();
    });

    it('should filter objects', () => {

        const keyFilter = (key, val, obj) => key === 'foo';
        const valFilter = (key, val, obj) => val === 'foo';
        const empFilter = (key, val, obj) => val === undefined ||
                                             val === null ||
                                             (val instanceof Array && val.length === 0) ||
                                             (val.constructor === Object && Object.keys(val).length === 0);
        const object    = {
            foo: 'bar',
            bar: 'foo',
            baz: {
                foo: 'bar',
            },
            bam: [],
            bom: {},
            bum: undefined,
            bem: null,
        };

        expect(util.filter(object, keyFilter)).toEqual({ foo: 'bar' });
        expect(util.exclude(object, keyFilter)).toEqual({ bar: 'foo', baz: { foo: 'bar' }, bam: [], bom: {}, bum: undefined, bem: null });

        expect(util.filter(object, valFilter)).toEqual({ bar: 'foo' });
        expect(util.exclude(object, valFilter)).toEqual({ foo: 'bar', baz: { foo: 'bar' }, bam: [], bom: {}, bum: undefined, bem: null });

        expect(util.filter(object, empFilter)).toEqual({ bam: [], bom: {}, bum: undefined, bem: null });

        expect(util.exclude(object, empFilter)).toEqual({ foo: 'bar', bar: 'foo', baz: { foo: 'bar' } });
    });

    it('should remove undefined fields', () => {

        const object = {
            foo: 'bar',
            bar: '',
            bam: [],
            bom: {},
            bum: undefined,
            bem: null,
        };

        expect(util.excludeUndefined({})).toEqual({});

        expect(util.excludeUndefined(object)).toEqual({ foo: 'bar', bar: '', bam: [], bom: {}, bem: null });
    });

    it('should remove null fields', () => {

        const object = {
            foo: 'bar',
            bar: '',
            bam: [],
            bom: {},
            bum: undefined,
            bem: null,
        };

        expect(util.excludeNull({})).toEqual({});

        expect(util.excludeNull(object)).toEqual({ foo: 'bar', bar: '', bam: [], bom: {}, bum: undefined });
    });

    it('should remove empty fields', () => {

        const object = {
            foo: 'bar',
            bar: '',
            bam: [],
            bom: {},
            bum: undefined,
            bem: null,
        };

        expect(util.excludeEmpty({})).toEqual({});

        expect(util.excludeEmpty(object)).toEqual({ foo: 'bar' });
    });
});
