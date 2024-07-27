import {Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import { APPLICATION_CONTEXT } from '../../models/application';

export const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: { mode: APPLICATION_CONTEXT.UNAUTHORIZED },
        children: [
            {
                path: '',

                pathMatch: 'full',
                loadComponent: async  () => (await import('../../components/job-ad-list/job-ad-list.component'))
                    .JobAdListComponent
            },
            {
                path: 'job/:id',
                loadComponent: async () => (await import('../../components/job-ad/job-ad.component'))
                    .JobAdComponent,
            },
        ],
    },

];
