import {Route} from '@angular/router';
import {ClientDashboardComponent} from './client-dashboard.component';
import {UnsavedChangesGuard} from '@tx/core';


export const dashboardRoutes: Route[] = [
    {
        path: '',
        component: ClientDashboardComponent,
        children: [
            {
                path: 'jobs',
                loadComponent: () => import('../../components/job-ad/job-ad.component')
                    .then(m => m.JobAdComponent),
            },
            {
                path: 'jobs/add',
                canDeactivate: [],
                loadComponent: () => import('../../components/job-ad-form/job-ad-form.component')
                    .then(m => m.JobAdFormComponent),
            },
            {
                path: 'jobs/edit/:id',
                canDeactivate: [UnsavedChangesGuard],
                loadComponent: () => import('../../components/job-ad-form/job-ad-form.component')
                    .then(m => m.JobAdFormComponent),
            },
            {
                path: 'jobs/:id',
                loadComponent: () => import('../../components/job-ad-form/job-ad-form.component')
                    .then(m => m.JobAdFormComponent),
            },
            {
                path: 'invoices',
                loadComponent: () => import('../../components/invoice/invoice.component')
                    .then(m => m.InvoiceComponent),
            },
            {
                path: 'invoices/:id',
                loadComponent: () => import('../../components/invoice/invoice.component')
                    .then(m => m.InvoiceComponent),
            }
        ],
    },

];
