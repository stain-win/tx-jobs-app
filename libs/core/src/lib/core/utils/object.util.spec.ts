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
