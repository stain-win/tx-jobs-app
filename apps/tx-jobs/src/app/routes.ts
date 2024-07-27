import {Routes} from '@angular/router';
import { authGuard, CORE_ROUTES_CONFIG, titleResolver } from '@tx/core';
import {LayoutComponent} from '../modules/layout/layout.component';

export const APP_ROUTES: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                title: titleResolver,
                loadChildren: async () => ( await import('../modules/home/home.routes')).homeRoutes,
            },
            {
                path: 'login',
                title: titleResolver,
                loadComponent: async () => (await import('../modules/login/login.component'))
                    .LoginComponent,
            },
            {
                path: 'register',
                title: titleResolver,
                loadComponent: async () => (await import('../modules/login/login.component'))
                    .LoginComponent,
            },
            {
                path: 'dashboard',
                canActivate: [authGuard],
                title: titleResolver,
                loadChildren: async () => (await import('../modules/client-dashboard/client-dashboard.routes'))
                    .dashboardRoutes,
            },
        ],
    },
    ...CORE_ROUTES_CONFIG,
];
