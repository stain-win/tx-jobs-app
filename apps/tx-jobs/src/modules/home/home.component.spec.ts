import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { ActivatedRoute } from '@angular/router';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let store: jest.Mocked<Store>;

    beforeEach(async () => {
        const storeMock = {
            dispatch: jest.fn(),
            select: jest.fn().mockReturnValue(of({}))
        };

        await TestBed.configureTestingModule({
            imports: [HomeComponent],
            providers: [
                { provide: Store, useValue: storeMock },
                { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: jest.fn() } } } }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(Store) as jest.Mocked<Store>;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
