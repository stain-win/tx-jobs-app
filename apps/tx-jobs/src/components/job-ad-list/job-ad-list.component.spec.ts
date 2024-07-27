import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { JobAdListComponent } from './job-ad-list.component';
import { loadJobAds, searchJobAds, deleteJobAd } from './store/jobAds.action';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog.component';

describe('JobAdListComponent', () => {
    let component: JobAdListComponent;
    let fixture: ComponentFixture<JobAdListComponent>;
    let store: jest.Mocked<Store>;
    let dialog: jest.Mocked<MatDialog>;
    let activatedRoute: jest.Mocked<ActivatedRoute>;

    beforeEach(async () => {
        const storeMock = {
            dispatch: jest.fn(),
            pipe: jest.fn().mockReturnValue(of([]))
        };

        const dialogMock = {
            open: jest.fn().mockReturnValue({
                afterClosed: jest.fn().mockReturnValue(of(true))
            })
        };

        const activatedRouteMock = {
            snapshot: {
                parent: {
                    data: {
                        mode: 'UNAUTHORIZED'
                    }
                }
            }
        };

        await TestBed.configureTestingModule({
            imports: [JobAdListComponent],
            providers: [
                { provide: Store, useValue: storeMock },
                { provide: MatDialog, useValue: dialogMock },
                { provide: ActivatedRoute, useValue: activatedRouteMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(JobAdListComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(Store) as jest.Mocked<Store>;
        dialog = TestBed.inject(MatDialog) as jest.Mocked<MatDialog>;
        activatedRoute = TestBed.inject(ActivatedRoute) as jest.Mocked<ActivatedRoute>;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should dispatch loadJobAds on ngOnInit', () => {
        component.ngOnInit();
        expect(store.dispatch).toHaveBeenCalledWith(loadJobAds({ published: false }));
    });

    it('should dispatch searchJobAds on onSearch', () => {
        const query = 'test';
        component.onSearch(query);
        expect(store.dispatch).toHaveBeenCalledWith(searchJobAds({ query }));
    });
});
