import { JobAdsService } from '../../../services/job-ads.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadJobAds, loadJobAdsSuccess } from './jobAds.action';
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
                switchMap(() =>
                    this.jobAdsService$.getJobAdsPublished().pipe(
                        map((jobAds) => loadJobAdsSuccess({ jobAds })),
                        catchError(() => EMPTY),
                ),
            )
        )
    );
}
