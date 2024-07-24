import {Routes} from '@angular/router';
import {authGuard, CORE_ROUTES_CONFIG} from '@tx/core';
import {LayoutComponent} from '../modules/layout/layout.component';

export const APP_ROUTES: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadChildren: async () => ( await import('../modules/home/home.routes')).homeRoutes,
            },
            {
                path: 'login',
                loadComponent: async () => (await import('../modules/login/login.component'))
                    .LoginComponent,
            },
            {
                path: 'register',
                loadComponent: async () => (await import('../modules/login/login.component'))
                    .LoginComponent,
            },
            {
                path: 'dashboard',
                canActivate: [authGuard],
                loadChildren: async () => (await import('../modules/client-dashboard/client-dashboard.routes'))
                    .dashboardRoutes,
            },
        ],
    },

    ...CORE_ROUTES_CONFIG,
];
