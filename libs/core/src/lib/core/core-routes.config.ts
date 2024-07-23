import {Route} from '@angular/router';
import {NotFoundComponent} from './components/not-found/not-found.component';
export const NOT_FOUND_ROUTE = '40x'
export const CORE_ROUTES_CONFIG: Route[] = [
    {
        path: NOT_FOUND_ROUTE,
        component: NotFoundComponent,
    },
    {
        path: '**',
        redirectTo: NOT_FOUND_ROUTE,
    },
];
