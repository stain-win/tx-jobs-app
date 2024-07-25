import { JobAdsService } from '../../../services/job-ads.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadJobAds, loadJobAdsSuccess } from './home.action';
import { catchError, EMPTY, map, switchMap } from 'rxjs';

export class HomeEffect {
    private actions$!: Actions;
    private jobAdsService$!: JobAdsService;

    constructor(actions$: Actions, jobAdsService$: JobAdsService) {
    }

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
