import {Route} from '@angular/router';
import {ClientDashboardComponent} from './client-dashboard.component';
import {UnsavedChangesGuard} from '@tx/core';
import { APPLICATION_CONTEXT } from '../../models/application';


export const dashboardRoutes: Route[] = [
    {
        path: '',
        component: ClientDashboardComponent,
        data: { mode: APPLICATION_CONTEXT.AUTHORIZED },
        children: [
            {
                path: '',
                pathMatch: 'full',
                loadComponent: async () => (await import('../../components/dashboard/dashboard.component'))
                    .DashboardComponent,
            },
            {
                path: 'jobs',
                loadComponent: async () => (await import('../../components/job-ad-list/job-ad-list.component'))
                    .JobAdListComponent,
            },
            {
                path: 'jobs/add',
                canDeactivate: [UnsavedChangesGuard],
                providers: [UnsavedChangesGuard],
                loadComponent: async () => (await import('../../components/job-ad-form/job-ad-form.component'))
                    .JobAdFormComponent,
            },
            {
                path: 'jobs/edit/:id',
                canDeactivate: [UnsavedChangesGuard],
                providers: [UnsavedChangesGuard],
                loadComponent: async () => (await import('../../components/job-ad-form/job-ad-form.component'))
                    .JobAdFormComponent,
            },
            {
                path: 'jobs/:id',
                loadComponent: async () => (await import('../../components/job-ad/job-ad.component'))
                    .JobAdComponent,
            },
            {
                path: 'invoices',
                loadComponent: async () => (await import('../../components/invoice/invoice.component'))
                    .InvoiceComponent,
            },
            {
                path: 'invoices/:id',
                loadComponent: async () => (await import('../../components/invoice/invoice.component'))
                    .InvoiceComponent,
            }
        ],
    },

];
