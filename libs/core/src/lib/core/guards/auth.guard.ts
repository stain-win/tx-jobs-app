import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services';

export const authGuard: CanActivateFn = (route, state) => {
    const authService$ = inject(AuthService);
    const router = inject(Router);
    if(authService$.isAuth()) {
        return true;
    }
    router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
};
