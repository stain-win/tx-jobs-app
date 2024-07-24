import {Routes} from '@angular/router';
import {HomeComponent} from './home.component';

export const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'job/:id',
                loadComponent: () => import('../../components/job-ad/job-ad.component')
                    .then(m => m.JobAdComponent),
            },
        ],
    },

];
