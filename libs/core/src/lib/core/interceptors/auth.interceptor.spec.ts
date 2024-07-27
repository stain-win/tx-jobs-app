import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';

import { authInterceptor } from './auth.interceptor';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('authInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            provideHttpClient(withInterceptors([authInterceptor])),
            provideHttpClientTesting(),
        ],
    });
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
