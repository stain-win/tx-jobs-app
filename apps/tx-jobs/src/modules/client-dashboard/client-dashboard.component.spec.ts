import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientDashboardComponent } from './client-dashboard.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnsavedChangesGuard } from '@tx/core';

describe('ClientDashboardComponent', () => {
    let component: ClientDashboardComponent;
    let fixture: ComponentFixture<ClientDashboardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ClientDashboardComponent, RouterTestingModule],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: {
                                get: jest.fn().mockReturnValue('1')
                            }
                        }
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ClientDashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
