import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { authGuard, AuthService } from '@tx/core';

describe('authGuard', () => {
    const executeGuard: CanActivateFn = (...guardParameters) =>
        TestBed.runInInjectionContext(() => authGuard(...guardParameters));

    let authService: jest.Mocked<AuthService>;
    let router: jest.Mocked<Router>;

    beforeEach(() => {
        authService = { isAuth: jest.fn() } as unknown as jest.Mocked<AuthService>;
        router = { navigate: jest.fn() } as unknown as jest.Mocked<Router>;

        TestBed.configureTestingModule({
            providers: [
                { provide: AuthService, useValue: authService },
                { provide: Router, useValue: router }
            ]
        });
    });

    it('should allow access if user is authenticated', () => {
        authService.isAuth.mockReturnValue(true);
        expect(executeGuard({} as any, {} as any)).toBe(true);
    });

    it('should deny access and navigate to login if user is not authenticated', () => {
        authService.isAuth.mockReturnValue(false);
        const state = { url: '/protected' } as any;
        expect(executeGuard({} as any, state)).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith(['/login'], { queryParams: { returnUrl: state.url } });
    });
});
