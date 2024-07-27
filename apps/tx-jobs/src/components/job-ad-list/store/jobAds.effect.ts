import { JobAdsService } from '../../../services/job-ads.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { deleteJobAd, loadJobAds, loadJobAdsSuccess, searchJobAds } from './jobAds.action';
import { catchError, EMPTY, map, switchMap } from 'rxjs';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class JobAdsEffect {
    private actions$ = inject(Actions);
    private jobAdsService$ = inject(JobAdsService);

    loadJobAds$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(loadJobAds),
                switchMap((action) =>
                    this.jobAdsService$.getJobAds(action.published).pipe(
                        map((jobAds) => loadJobAdsSuccess({ jobAds })),
                        catchError(() => EMPTY),
                ),
            )
        )
    );
    deleteJobAd$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(deleteJobAd),
                switchMap((action) =>
                    this.jobAdsService$.deleteJobAd(action.id).pipe(
                        map(() => loadJobAds({ published: false })),
                        catchError(() => EMPTY),
                ),
            )
        )
    );

    searchJobAds$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(searchJobAds),
                switchMap((action) =>
                    this.jobAdsService$.searchJobAds(action.query).pipe(
                        map((jobAds) => loadJobAdsSuccess({ jobAds })),
                        catchError(() => EMPTY),
                ),
            )
        )
    );
}
