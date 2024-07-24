/**
 * A RegExp for spaces
 */
const SPACES = /\s+([\S])/g;

/**
 * A RegExp for dashes
 */
const DASHES = /-([a-zA-Z0-9])/g;

/**
 * A RegExp for underscores
 */
const UNDERS = /_([a-zA-Z0-9])/g;

/**
 * A RegExp for camel-cased letters
 */
const CAMELS = /[a-z0-9]([A-Z])/g;

/**
 * A RegExp for the first letter
 */
const FIRST = /^[^]/;

/**
 * A utility class for string operations
 */
export class StringUtil {

    static transform (string: string, letterCase?: StringUtil.LetterCase | null): string {

        switch (letterCase) {

            case StringUtil.LetterCase.capitalCase:

                return this.capitalize(string);

            case StringUtil.LetterCase.upperCase:

                return this.upperCase(string);

            case StringUtil.LetterCase.lowerCase:

                return this.lowerCase(string);

            case StringUtil.LetterCase.camelCase:

                return this.camelCase(string);

            case StringUtil.LetterCase.kebabCase:

                return this.kebabCase(string);

            case StringUtil.LetterCase.snakeCase:

                return this.snakeCase(string);

            default:

                return string;
        }
    }

    static capitalize (string: string): string {

        if (string) {

            const first = string[0];

            return string.replace(FIRST, first.toUpperCase());
        }

        return string;
    }

    static upperCase (string: string): string {

        return string.toUpperCase();
    }

    static lowerCase (string: string): string {

        return string.toLowerCase();
    }

    static camelCase (string: string): string {

        let matches;

        if (string) {

            string = string.trim();

            // tslint:disable-next-line:no-conditional-assignment
            while ((matches = SPACES.exec(string))) {

                string = string.replace(matches[0], matches[1].toUpperCase());

                SPACES.lastIndex = 0;
            }

            // tslint:disable-next-line:no-conditional-assignment
            while ((matches = DASHES.exec(string))) {

                string = string.replace(matches[0], matches[1].toUpperCase());

                DASHES.lastIndex = 0;
            }

            // tslint:disable-next-line:no-conditional-assignment
            while ((matches = UNDERS.exec(string))) {

                string = string.replace(matches[0], matches[1].toUpperCase());

                UNDERS.lastIndex = 0;
            }

            return string.replace(FIRST, string[0].toLowerCase());
        }

        return string;
    }

    static kebabCase (string: string): string {

        let matches;

        if (string) {

            string = string.trim();

            // tslint:disable-next-line:no-conditional-assignment
            while ((matches = SPACES.exec(string))) {

                string = string.replace(matches[0], '-' + matches[1]);

                SPACES.lastIndex = 0;
            }

            // tslint:disable-next-line:no-conditional-assignment
            while ((matches = CAMELS.exec(string))) {

                string = string.replace(matches[0], matches[0][0] + '-' + matches[1]);

                CAMELS.lastIndex = 0;
            }

            // tslint:disable-next-line:no-conditional-assignment
            while ((matches = UNDERS.exec(string))) {

                string = string.replace(matches[0], '-' + matches[1]);

                UNDERS.lastIndex = 0;
            }
        }

        return string.toLowerCase();
    }

    static snakeCase (string: string): string {

        let matches;

        if (string) {

            string = string.trim();

            // tslint:disable-next-line:no-conditional-assignment
            while ((matches = SPACES.exec(string))) {

                string = string.replace(matches[0], '_' + matches[1]);

                SPACES.lastIndex = 0;
            }

            // tslint:disable-next-line:no-conditional-assignment
            while ((matches = CAMELS.exec(string))) {

                string = string.replace(matches[0], matches[0][0] + '_' + matches[1]);

                CAMELS.lastIndex = 0;
            }

            // tslint:disable-next-line:no-conditional-assignment
            while ((matches = DASHES.exec(string))) {

                string = string.replace(matches[0], '_' + matches[1]);

                DASHES.lastIndex = 0;
            }
        }

        return string.toLowerCase();
    }

    /**
     * Parse/prepare folder path
     * Returns parsed path: "Files / Lorem Ipsum / Dolor sit amet"
     */
    static parseFolderPath (path: string, prefix?: string, suffix?: string, joinChar: string = '/', truncateItemNum?: number) {
        // tslint:disable-next-line:triple-equals
        let paths = path.split('/').filter(x => x != '');
        paths.splice(0, 2);
        paths = paths.map(x => {
            if (truncateItemNum) {
                const nameSuffix = x.length > truncateItemNum ? '...' : '';
                x = x.substring(0, truncateItemNum) + nameSuffix;
            }
            return x;
        });

        if (prefix || prefix === '') { paths.unshift(prefix); }
        if (suffix || suffix === '') { paths.push(suffix); }

        return paths.join(joinChar);
    }

    /**
     * Returns the initials from the given name.
     * The output is limited to 3 characters and numbers as standalone
     * words are ignored.
     */
    static initials (name?: string): string {
        if (!name) {
            return '';
        }

        const words = name.split(/\s+/g);
        const initials = words
            .map(word => word.charAt(0).toUpperCase())
            .filter(letter => isNaN(Number(letter)));

        return initials.slice(0, 3).join('');
    }
}

/**
 * Utility namespace with custom types
 */
// tslint:disable-next-line:no-namespace
export namespace StringUtil {

    export enum LetterCase {
        capitalCase,
        upperCase,
        lowerCase,
        camelCase,
        kebabCase,
        snakeCase,
    }
}
