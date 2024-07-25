import { JobAdStore } from './job-ad.store';
import { TestBed } from '@angular/core/testing';
import { createSpyObj } from 'jest-createspyobj';

describe('JobAdStore', () => {
    let jobAdStore: JobAdStore;
    const jobAdServiceSpy = createSpyObj('JobAdService', ['getJobAd']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: JobAdStore, useValue: jobAdServiceSpy }
            ]
        });
        jobAdStore = TestBed.inject(JobAdStore);
    });

    it('should be created', () => {
        expect(jobAdStore).toBeTruthy();
    });
});
