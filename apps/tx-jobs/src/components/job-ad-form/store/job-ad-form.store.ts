import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { JobAdDto } from '../../../models/job';
import { catchError, combineLatest, filter, iif, map, Observable, of, switchMap, tap } from 'rxjs';
import { JobAdsService } from '../../../services/job-ads.service';
import moment from 'moment';
import { InvoicesService } from '../../../services/invoices.service';
import { Router } from '@angular/router';
import { JobAdFormMode, JobAdFormModeType } from '../job-ad-form.component';

export interface JobAdFormState {
    jobAd: JobAdDto;
    validationErrors?: Record<string, string>;
    saved: boolean;
    mode: JobAdFormModeType;
}

export interface JobAdFormData {
    id: string;
    title: string;
    description: string;
    skills: string[];
    status: string;
}

export interface JobAdFormVm {
    jobAdData: JobAdFormData;
    savedState: boolean;
    validationErrors: JobAdFormState['validationErrors'];
}

const initialState: JobAdFormState = {
    jobAd : {
        id: '',
        title: '',
        description: '',
        skills: [],
        status: 'draft',
        invoices: [],
        createdAt: moment().format(),
        updatedAt: moment().format(),
    },
    validationErrors: {},
    saved: false,
    mode: 'create'
};

@Injectable()
export class JobAdFormStore extends ComponentStore<JobAdFormState> {
    readonly setFormMode = this.updater((state, mode: JobAdFormModeType) => ({ ...state, mode }));
    readonly setJobAd = this.updater((state, jobAd: JobAdDto) => ({ ...state, jobAd }));

    readonly jobAd$ = this.select(state => state.jobAd);
    readonly jobAdStatus$ = this.select(state => state.jobAd.status);
    readonly jobAdEmbedded$ = this.select(state => state.jobAd.invoices);
    readonly jobAdData$ = this.select(state => ({
        id: state.jobAd.id,
        title: state.jobAd.title,
        description: state.jobAd.description,
        skills: state.jobAd.skills,
        status: state.jobAd.status,
        invoices: state.jobAd.invoices,
    }));

    readonly jobAdStatuses$ = this.jobAdData$.pipe(map(jobAdData => jobAdData.status));
    readonly jobAdSaveStatus$ = this.select(state =>  state.saved);
    readonly jobAdErrors$ = this.select(state =>  state.validationErrors);
    readonly jobAdMode$ = this.select(state => state.mode);
    readonly jobAdVm$ = this.select({
        jobAdData: this.jobAdData$,
        savedState: this.jobAdSaveStatus$,
        validationErrors: this.jobAdErrors$
    });

    constructor(
        private jobService: JobAdsService,
        private invoicesService: InvoicesService,
        private router: Router,
    ) {
        super(initialState);
    }

    loadJobAdData = this.effect<{ id: string }>((jobId$) =>
        jobId$.pipe(
            switchMap(({ id }) => this.jobService.getJobAd(id).pipe(
                tap(jobAdDto => this.patchState({
                    jobAd: jobAdDto,
                    validationErrors: {},
                    saved: false
                })),
                catchError(err => {
                    this.patchState({ validationErrors: { error: err.error }, saved: false });
                    return of(null);
                })
            ))
        )
    );

    saveJobAd = this.effect((jobAd$: Observable<JobAdDto | null>) =>
        jobAd$.pipe(
            switchMap(jobAd => iif(
                () => this.get().mode === JobAdFormMode.EDIT,
                this.jobService.editJobAd(jobAd as JobAdDto),
                this.jobService.createJobAd(jobAd as JobAdDto)
            ).pipe(
                tap(data => this.patchState({
                    jobAd: {...this.get().jobAd, ...data},
                    validationErrors: {},
                    saved: true
                })),
                tap(jobAd => this.router.navigate([`/dashboard/jobs/${jobAd.id}`])),
                catchError(error => {
                    this.patchState({ validationErrors: error.error, saved: false });
                    return of(null);
                })
            ))
        )
    );

    loadJobAdInvoice = this.effect<{ id: string }>(jobId$ =>
        jobId$.pipe(
            switchMap(({ id }) => this.invoicesService.getInvoices().pipe(
                catchError(err => {
                    this.patchState({ validationErrors: err.error, saved: false });
                    return of(null);
                })
            ))
        )
    );

    createInvoice = this.effect<{ id: string }>(jobAdId$ =>
        jobAdId$.pipe(
            switchMap(jobAd => this.invoicesService.createInvoice(jobAd.id, {}).pipe(
                catchError(err => {
                    this.patchState({ validationErrors: err.error, saved: false });
                    return of(null);
                })
            ))
        )
    );

    triggerCreateInvoice = this.effect(_ =>
        combineLatest([this.jobAdStatuses$, this.jobAdEmbedded$, this.jobAdSaveStatus$]).pipe(
            filter(([status, embedded, saved] )=>
                status === 'published' && (!embedded ||embedded.length === 0) && saved),
            tap(_ => this.createInvoice({ id: this.get().jobAd.id }))
        )
    );

    deleteJobAd = this.effect<{ id: string }>(jobId$ =>
        jobId$.pipe(
            switchMap(({ id }) => this.jobService.deleteJobAd(id).pipe(
                tap( _ => this.patchState(initialState)),
                catchError(err => {
                    this.patchState({ validationErrors: err.error, saved: false });
                    return of(null);
                })
            ))
        )
    );
}
