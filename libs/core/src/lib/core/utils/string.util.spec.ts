import { StringUtil } from './string.util';

describe('StringUtil', () => {

    const util = StringUtil;

    it('should be exported', () => {

        expect(util).toBeTruthy();
    });

    it('should capitalize strings', () => {

        expect(util.capitalize('foobar')).toBe('Foobar');
        expect(util.capitalize('foobar foo')).toBe('Foobar foo');

        expect(util.capitalize('')).toBe('');
    });

    it('should upper-case strings', () => {

        expect(util.upperCase('foobar')).toBe('FOOBAR');
        expect(util.upperCase('foobar foo')).toBe('FOOBAR FOO');

        expect(util.upperCase('')).toBe('');
    });

    it('should lower-case strings', () => {

        expect(util.lowerCase('FOOBAR')).toBe('foobar');
        expect(util.lowerCase('FOOBAR FOO')).toBe('foobar foo');

        expect(util.lowerCase('')).toBe('');
    });

    it('should camel-case strings', () => {

        expect(util.camelCase('foobar')).toBe('foobar');

        expect(util.camelCase('foo bar baz')).toBe('fooBarBaz');
        expect(util.camelCase('Foo Bar Baz')).toBe('fooBarBaz');

        expect(util.camelCase('foo bar baz 7b')).toBe('fooBarBaz7b');
        expect(util.camelCase('Foo Bar Baz 7B')).toBe('fooBarBaz7B');

        expect(util.camelCase('foo-bar-baz')).toBe('fooBarBaz');
        expect(util.camelCase('Foo-Bar-Baz')).toBe('fooBarBaz');

        expect(util.camelCase('foo_bar_baz')).toBe('fooBarBaz');
        expect(util.camelCase('Foo_Bar_Baz_7b')).toBe('fooBarBaz7b');

        expect(util.camelCase('fooBarBaz')).toBe('fooBarBaz');
        expect(util.camelCase('FooBarBaz')).toBe('fooBarBaz');

        expect(util.camelCase('')).toBe('');
    });

    it('should kebab-case strings', () => {

        expect(util.kebabCase('foobar')).toBe('foobar');

        expect(util.kebabCase('foo bar baz')).toBe('foo-bar-baz');
        expect(util.kebabCase('Foo Bar Baz 7b')).toBe('foo-bar-baz-7b');

        expect(util.kebabCase('fooBarBaz')).toBe('foo-bar-baz');
        expect(util.kebabCase('FooBarBaz')).toBe('foo-bar-baz');
        expect(util.kebabCase('fooBar7Baz')).toBe('foo-bar7-baz');

        expect(util.kebabCase('foo_bar_baz')).toBe('foo-bar-baz');
        expect(util.kebabCase('Foo_Bar7_Baz')).toBe('foo-bar7-baz');

        expect(util.kebabCase('foo-bar-baz')).toBe('foo-bar-baz');
        expect(util.kebabCase('Foo-Bar7-8baz')).toBe('foo-bar7-8baz');
        expect(util.kebabCase('Foo-Bar7-8Baz')).toBe('foo-bar7-8-baz');

        expect(util.kebabCase('')).toBe('');
    });

    it('should snake-case strings', () => {

        expect(util.snakeCase('foobar')).toBe('foobar');

        expect(util.snakeCase('foo bar baz')).toBe('foo_bar_baz');
        expect(util.snakeCase('Foo Bar Baz')).toBe('foo_bar_baz');

        expect(util.snakeCase('fooBarBaz')).toBe('foo_bar_baz');
        expect(util.snakeCase('FooBarBaz')).toBe('foo_bar_baz');
        expect(util.snakeCase('FooBar7Baz')).toBe('foo_bar7_baz');

        expect(util.snakeCase('foo-bar-baz')).toBe('foo_bar_baz');
        expect(util.snakeCase('Foo-Bar-Baz')).toBe('foo_bar_baz');
        expect(util.snakeCase('Foo-Bar-7baz')).toBe('foo_bar_7baz');
        expect(util.snakeCase('Foo-Bar-7Baz')).toBe('foo_bar_7_baz');

        expect(util.snakeCase('foo_bar_baz')).toBe('foo_bar_baz');
        expect(util.snakeCase('Foo_Bar_Baz')).toBe('foo_bar_baz');

        expect(util.snakeCase('')).toBe('');
    });

    it('should transform strings based on a format', () => {

        expect(util.transform('foo bar', StringUtil.LetterCase.capitalCase)).toBe('Foo bar');
        expect(util.transform('foo bar', StringUtil.LetterCase.upperCase)).toBe('FOO BAR');
        expect(util.transform('FOO BAR', StringUtil.LetterCase.lowerCase)).toBe('foo bar');
        expect(util.transform('foo_bar_baz', StringUtil.LetterCase.camelCase)).toBe('fooBarBaz');
        expect(util.transform('fooBarBaz', StringUtil.LetterCase.kebabCase)).toBe('foo-bar-baz');
        expect(util.transform('fooBarBaz', StringUtil.LetterCase.snakeCase)).toBe('foo_bar_baz');

        expect(util.transform('foo bar', null)).toBe('foo bar');
    });
});
