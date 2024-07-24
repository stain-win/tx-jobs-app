import {Inject, Injectable} from '@angular/core';
import {CORE_CONFIG, CoreConfig} from '../core.config';
import {QueryParameterUtil, StringUtil} from '../utils';
import QueryParameters = QueryParameterUtil.QueryParameters;
import LetterCase = StringUtil.LetterCase;

const LEADING_TRAILING_SLASHES = /^\/|\/$/g;
const LEADING_SLASHES = /^\//g;

export interface ApiUrlOptions {
    apiBaseUrl?: string;
    apiPath?: string;
    apiVersion?: string;
    queryParams?: QueryParameters;
    queryParamKeyCase?: LetterCase;
}

@Injectable({
    providedIn: 'root'
})
export class ApiUrlService {
    apiPath: string = '';
    apiVersion: string = '';

    constructor(@Inject(CORE_CONFIG) private config: CoreConfig) {
        this.apiPath = this.config.environment.apiPath.replace(LEADING_TRAILING_SLASHES, '');;
        this.apiVersion = this.config.environment.apiVersion.replace(LEADING_TRAILING_SLASHES, '');;
    }

    createApiUrl(path: string, options: ApiUrlOptions): string {
        const apiPathSegments = [
            options && options.hasOwnProperty('apiPath') ?
                options?.apiPath?.replace(LEADING_TRAILING_SLASHES, '') : this.apiPath,
            options && options.hasOwnProperty('apiVersion') ?
                options?.apiVersion?.replace(LEADING_TRAILING_SLASHES, '') : this.apiVersion,
            path.replace(LEADING_SLASHES, ''),
        ];

        let apiUrl: string =
            `${options.apiBaseUrl ?? ''}/${apiPathSegments.filter(segment => !!segment).join('/')}`;

        if (options && options.queryParams) {

            apiUrl += '?' + QueryParameterUtil.createQueryString(options.queryParams, options.queryParamKeyCase);
        }

        return apiUrl;
    }
}
