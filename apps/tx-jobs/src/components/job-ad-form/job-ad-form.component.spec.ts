import { TestBed, ComponentFixture } from '@angular/core/testing';
import { JobAdFormComponent, JobAdFormMode } from './job-ad-form.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { JobAdFormStore } from './store/job-ad-form.store';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { JobAdStatus } from '../../models/job';
import { DestroyService } from '@tx/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CORE_CONFIG } from '../../../../../libs/core/src/lib/core/core.config';

describe('JobAdFormComponent', () => {
    let component: JobAdFormComponent;
    let fixture: ComponentFixture<JobAdFormComponent>;
    let jobAdFormStore$: jest.Mocked<JobAdFormStore>;
    let router: jest.Mocked<Router>;

    beforeEach(async () => {
        const jobAdFormStoreMock = {
            setFormMode: jest.fn(),
            loadJobAdData: jest.fn(),
            saveJobAd: jest.fn(),
            jobAdVm$: of({
                jobAdData: {
                    id: '1',
                    title: 'Test Job',
                    description: 'Test Description',
                    skills: ['Test Skill'],
                    status: 'PUBLISHED'
                }
            })
        };

        const routerMock = {
            routerState: {
                snapshot: {
                    url: '/edit'
                }
            }
        };

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, JobAdFormComponent, HttpClientTestingModule],
            providers: [
                FormBuilder,
                DestroyService,
                { provide: JobAdFormStore, useValue: jobAdFormStoreMock },
                { provide: Router, useValue: routerMock },
                { provide: CORE_CONFIG, useValue: {
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

        fixture = TestBed.createComponent(JobAdFormComponent);
        component = fixture.componentInstance;
        jobAdFormStore$ = TestBed.inject(JobAdFormStore) as jest.Mocked<JobAdFormStore>;
        router = TestBed.inject(Router) as jest.Mocked<Router>;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize form with default values in create mode', () => {
        component.mode = JobAdFormMode.CREATE;
        component.ngOnInit();
        expect(component.jobAdForm.value).toEqual({
            id: '',
            title: '',
            description: '',
            skills: [],
            status: 'draft'
        });
    });

    it('should set formValid to true when form is valid', () => {
        component.ngOnInit();
        component.jobAdForm.patchValue({
            title: 'Test Job',
            description: 'Test Description'
        });
        expect(component.formValid).toBe(true);
    });

    it('should set formValid to false when form is invalid', () => {
        component.ngOnInit();
        component.jobAdForm.patchValue({
            title: '',
            description: ''
        });
        expect(component.formValid).toBe(false);
    });


    it('should not submit form when invalid', () => {
        const saveJobAdSpy = jest.spyOn(jobAdFormStore$, 'saveJobAd');
        component.ngOnInit();
        component.jobAdForm.patchValue({
            title: '',
            description: ''
        });
        component.onSubmit();
        expect(saveJobAdSpy).not.toHaveBeenCalled();
    });

    it('should handle window beforeunload event when form is not pristine', () => {
        const event = new Event('beforeunload');
        jest.spyOn(event, 'preventDefault');
        component.ngOnInit();
        component.jobAdForm.markAsDirty();
        component.unloadNotification(event as BeforeUnloadEvent);
        expect(event.returnValue).toBe(true);
    });

});
