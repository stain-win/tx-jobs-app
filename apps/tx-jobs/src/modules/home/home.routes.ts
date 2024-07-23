import {Routes} from '@angular/router';
import {HomeComponent} from './home.component';

export const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'login',
                loadComponent: () => import('../../components/login/login.component')
                    .then(m => m.LoginComponent),
            },
            {
                path: 'register',
                loadComponent: () => import('../../components/login/login.component')
                    .then(m => m.LoginComponent),
            },
            {
                path: 'job/:id',
                loadComponent: () => import('../../components/job-ad/job-ad.component')
                    .then(m => m.JobAdComponent),
            },
        ],
    },

];
