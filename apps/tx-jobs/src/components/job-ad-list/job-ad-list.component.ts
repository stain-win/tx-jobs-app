import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { deleteJobAd, loadJobAds, searchJobAds } from './store/jobAds.action';
import { getError, getIsLoading, getJobAds } from './store/jobAds.selector';
import { Observable, takeUntil, tap } from 'rxjs';
import { JobAdDto } from '../../models/job';
import { AsyncPipe, DatePipe, JsonPipe, KeyValuePipe, NgTemplateOutlet } from '@angular/common';
import { CardComponent, SearchComponent, TableComponent } from '@tx/core/ui';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { APPLICATION_CONTEXT, ApplicationContext } from '../../models/application';
import { DestroyService, HighlightPipe } from '@tx/core';
import {
    MatDialog, MatDialogRef
} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog.component';


@Component({
    selector: 'tx-job-ad-list',
    standalone: true,
    imports: [
        AsyncPipe,
        CardComponent,
        RouterLink,
        TableComponent,
        JsonPipe,
        KeyValuePipe,
        NgTemplateOutlet,
        DatePipe,
        SearchComponent,
        HighlightPipe,
    ],
    providers: [MatDialog, DestroyService],
    templateUrl: './job-ad-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobAdListComponent implements OnInit {
    jobAds$: Observable<JobAdDto[]>;
    jobAdsError$: Observable<string | null>;
    jobAdsIsLoading$: Observable<boolean>;
    searchTerm: string = '';
    visibleHeaders: string[] = [];

    context: ApplicationContext | undefined;
    private dialogRef: MatDialogRef<ConfirmDialogComponent, any> | undefined;

    constructor(private _store: Store,
                private activatedRoute: ActivatedRoute,
                private dialog : MatDialog,
                private destroy$: DestroyService,
                ) {
        this.jobAds$ = this._store.pipe(select(getJobAds));
        this.jobAdsError$ = this._store.pipe(select(getError));
        this.jobAdsIsLoading$ = this._store.pipe(select(getIsLoading));
        this.context = this.activatedRoute.snapshot.parent?.data['mode'];
        this.jobAds$.pipe(
            tap(ads => {
                this.visibleHeaders = ads.length ? [...Object.keys(ads[0]), 'action'] : [];
            }),
            takeUntil(this.destroy$)
        ).subscribe();
    }

    ngOnInit() {
        this._store.dispatch(loadJobAds({ published: this.context === APPLICATION_CONTEXT.UNAUTHORIZED }));
    }

    onSearch(query: string) {
        this.searchTerm = query;
        this._store.dispatch(searchJobAds({ query }));
    }

    onDelete(id: string) {
        this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px'
        });
        this.dialogRef.afterClosed().pipe(
            tap( confirm => {
                if(confirm) {
                    this._store.dispatch(deleteJobAd({ id }));
                }
            }),
            takeUntil(this.destroy$)
        ).subscribe();
    }
}
