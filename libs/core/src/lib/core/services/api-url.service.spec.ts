import { TestBed } from '@angular/core/testing';
import { ApiUrlService, ApiUrlOptions } from './api-url.service';
import { CORE_CONFIG, CoreConfig } from '../core.config';
import { QueryParameterUtil } from '../utils';

describe('ApiUrlService', () => {
    let service: ApiUrlService;
    const mockConfig: CoreConfig = {
        environment: {
            apiPath: '/api',
            apiVersion: '/v1',
            apiBaseUrl: ''
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ApiUrlService,
                { provide: CORE_CONFIG, useValue: mockConfig }
            ]
        });
        service = TestBed.inject(ApiUrlService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should construct URL correctly with default options', () => {
        const url = service.createApiUrl('endpoint', {});
        expect(url).toBe('/api/v1/endpoint');
    });

    it('should construct URL correctly with provided apiPath and apiVersion', () => {
        const options: ApiUrlOptions = {
            apiPath: '/customApi',
            apiVersion: '/v2'
        };
        const url = service.createApiUrl('endpoint', options);
        expect(url).toBe('/customApi/v2/endpoint');
    });
});
