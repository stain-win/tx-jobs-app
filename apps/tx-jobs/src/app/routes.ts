import {Routes} from '@angular/router';
import {CORE_ROUTES_CONFIG} from '@tx/core';

export const APP_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    },
    {
        path: 'home',
        loadChildren: () => import('../modules/home/home.routes').then(m => m.homeRoutes),
    },
    {
        path: 'dashboard',
        canActivate: [],
        loadChildren: () => import('../modules/client-dashboard/client-dashboard.routes')
            .then(m => m.dashboardRoutes),
    },
    ...CORE_ROUTES_CONFIG,
];
