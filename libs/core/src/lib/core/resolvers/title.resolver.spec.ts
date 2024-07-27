import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { titleResolver } from '@tx/core';

describe('titleResolver', () => {
    const executeResolver: ResolveFn<string> = (...resolverParameters) =>
        TestBed.runInInjectionContext(() => titleResolver(...resolverParameters));

    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it('should be created', () => {
        expect(executeResolver).toBeTruthy();
    });
});
