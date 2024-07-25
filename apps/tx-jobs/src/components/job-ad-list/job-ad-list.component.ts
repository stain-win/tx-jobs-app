import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { loadJobAds } from './store/jobAds.action';
import { getError, getIsLoading, getJobAds, getJobAdsState } from './store/jobAds.selector';
import { Observable } from 'rxjs';
import { JobAdDto } from '../../models/job';
import { AsyncPipe } from '@angular/common';
import { CardComponent } from '@tx/core/ui';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'tx-job-ad-list',
    standalone: true,
    imports: [
        AsyncPipe,
        CardComponent,
        RouterLink
    ],
    templateUrl: './job-ad-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobAdListComponent implements OnInit {
    jobAds$: Observable<JobAdDto[]>;
    jobAdsError$: Observable<string | null>;
    jobAdsIsLoading$: Observable<boolean>;

    constructor(private _store: Store) {
        this.jobAds$ = this._store.pipe(select(getJobAds));
        this.jobAdsError$ = this._store.pipe(select(getError));
        this.jobAdsIsLoading$ = this._store.pipe(select(getIsLoading));
    }

    ngOnInit() {
        this._store.dispatch(loadJobAds());
    }
}
