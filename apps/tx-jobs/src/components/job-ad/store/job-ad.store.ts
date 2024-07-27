import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { JobAdDto } from '../../../models/job';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { JobAdsService } from '../../../services/job-ads.service';
import moment from 'moment';

export interface JobAdState {
    jobAd: JobAdDto;
    isLoading: boolean;
    error: string | null;
}

export interface JobAdVm {
    jobAd: JobAdDto;
    error: string | null;
}

export const initialJobAdState: JobAdState = {
    jobAd :{
        id: '',
        title: '',
        description: '',
        skills: [],
        status: 'draft',
        invoices: [],
        createdAt: moment().format(),
        updatedAt: moment().format(),
    },
    isLoading: false,
    error: null,
};

@Injectable()
export class JobAdStore extends ComponentStore<JobAdState> {
    private readonly jobError$ = this.select((state) => state.error);
    private readonly jobAd$ =this.select((state) => state.jobAd);
    readonly jobLoading$ = this.select((state) => state.isLoading);

    readonly jobAdVm$ = this.select({
        jobAd: this.jobAd$,
        error: this.jobError$,
    }, {debounce: true});

    loadJobAd = this.effect<{id: string, published: boolean, embedded: boolean}>((jobId$) =>
        jobId$.pipe(
            tap(() => {
                this.patchState({
                    isLoading: true,
                    error: null
                });
            }),
            switchMap( (data ) => {
                return this.jobService.getJobAd(data.id, data.published, data.embedded).pipe(
                    tap((jobAd) => {
                        this.patchState({
                            jobAd: {...jobAd},
                            isLoading: false
                        });
                    }),
                    catchError((error) => {
                        this.patchState({
                            error: error.message,
                            isLoading: false
                        });
                        return of([error]);
                    })
                );
            }),
        )
    );

    constructor(private jobService: JobAdsService) {
        super(<JobAdState>initialJobAdState);
    }
}
