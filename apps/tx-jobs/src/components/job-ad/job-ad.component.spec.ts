import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JobAdStore } from './store/job-ad.store';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { JobAdComponent } from './job-ad.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobAdDto } from '../../models/job';
import { CORE_CONFIG } from '../../../../../libs/core/src/lib/core/core.config';

const jobAd: JobAdDto = {
    id: '1',
    title: 'Test Job',
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    description: 'Test Description',
    status: 'PUBLISHED',
    skills: ['Test Skill'],
    invoices: [],
};

describe('JobAdComponent', () => {
    let component: JobAdComponent;
    let fixture: ComponentFixture<JobAdComponent>;
    let jobAdStore: JobAdStore;
    let activatedRoute: ActivatedRoute;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [JobAdComponent, HttpClientTestingModule],
            providers: [
                JobAdStore,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            parent: {
                                data: {
                                    mode: 'AUTHORIZED'
                                }
                            }
                        }
                    }
                },
                {
                    provide: CORE_CONFIG, useValue: {
                        environment: {
                            auth: {
                                baseUrl: 'test',
                                apiPath: '/api',
                                apiVersion: ''
                            },
                            apiBaseUrl: 'test',
                            apiPath: '/api',
                            apiVersion: ''
                        }
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(JobAdComponent);
        component = fixture.componentInstance;
        jobAdStore = TestBed.inject(JobAdStore);
        activatedRoute = TestBed.inject(ActivatedRoute);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
