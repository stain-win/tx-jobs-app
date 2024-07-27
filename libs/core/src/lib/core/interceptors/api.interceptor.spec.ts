import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';

import { apiInterceptor } from './api.interceptor';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('apiInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => apiInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            provideHttpClient(withInterceptors([apiInterceptor])),
            provideHttpClientTesting(),
        ],
    });
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
