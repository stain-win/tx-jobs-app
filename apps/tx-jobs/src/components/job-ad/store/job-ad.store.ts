import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { JobAd } from '../../../models/job';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { JobAdsService } from '../../../services/job-ads.service';

export interface JobAdState extends JobAd {
    isLoading: boolean;
    error: string | null;
}

export interface JobAdVm {
    jobAd: JobAdState;
    error: string | null;
}

export const initialJobAdState: JobAdState = {
    id: '',
    title: '',
    description: '',
    isLoading: false,
    error: null,
    skills: [],
    status: 'draft',
};

@Injectable()
export class JobAdStore extends ComponentStore<JobAdState> {
    private readonly jobError$ = this.select((state) => state.error);
    private readonly jobAd$ =this.select((state) => state);
    readonly jobLoading$ = this.select((state) => state.isLoading);

    readonly jobAdVm$ = this.select({
        jobAd: this.jobAd$.pipe(filter((jobAd) => jobAd.status === 'published')),
        error: this.jobError$,
    }, {debounce: true});

    loadJobAd = this.effect<{id: string}>((jobId$) =>
        jobId$.pipe(
            tap(() => {
                this.patchState({
                    isLoading: true,
                    error: null
                });
            }),
            map((id) => id.id),
            switchMap( (id ) => {
                return this.jobService.getJobAd(id).pipe(
                    tap((jobAd) => {
                        this.patchState({
                            ...jobAd,
                            isLoading: false
                        });
                    }),
                    catchError((error) => {
                        this.patchState({
                            error: error.message,
                            isLoading: false
                        });
                        return of(null);
                    })
                );
            }),
        )
    );

    constructor(private jobService: JobAdsService) {
        super(<JobAdState>initialJobAdState);
    }
}
