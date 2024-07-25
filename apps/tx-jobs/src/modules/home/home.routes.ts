import {Routes} from '@angular/router';
import {HomeComponent} from './home.component';

export const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                loadComponent: async  () => (await import('../../components/job-ad-list/job-ad-list.component'))
                    .JobAdListComponent
            },
            {
                path: 'job/:id',
                loadComponent: () => import('../../components/job-ad/job-ad.component')
                    .then(m => m.JobAdComponent),
            },
        ],
    },

];
