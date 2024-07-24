import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services';

export const authGuard: CanActivateFn = (route, state) => {
    const authService$ = inject(AuthService);
    const router = inject(Router);
    return authService$.isAuth() ? true : router.createUrlTree(['/login']);
};
