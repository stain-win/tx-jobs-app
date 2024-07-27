import { TestBed } from '@angular/core/testing';
import { JobAdFormStore, JobAdFormState } from './job-ad-form.store';
import { JobAdsService } from '../../../services/job-ads.service';
import { InvoicesService } from '../../../services/invoices.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { JobAdDto } from '../../../models/job';
import moment from 'moment';
import { InvoiceDto } from '../../../models/invoice';

const mockInvoices: InvoiceDto[]  = [
    {
        id: '1', jobId: '1', amount: '100', dueDate: '2021-01-01',
        createdAt: '',
        updatedAt: '',
        job: {}
    }
];
describe('JobAdFormStore', () => {
    let store: JobAdFormStore;
    let jobAdsService: jest.Mocked<JobAdsService>;
    let invoicesService: jest.Mocked<InvoicesService>;
    let router: jest.Mocked<Router>;

    const jobAd: JobAdDto = {
        id: '1',
        title: 'Test Job',
        description: 'Test Description',
        skills: ['Test Skill'],
        status: 'draft',
        invoices: [],
        createdAt: moment().format(),
        updatedAt: moment().format(),
    };

    beforeEach(() => {
        const jobAdsServiceMock = {
            getJobAd: jest.fn(),
            createJobAd: jest.fn(),
            editJobAd: jest.fn(),
            deleteJobAd: jest.fn(),
        };

        const invoicesServiceMock = {
            getInvoices: jest.fn(),
            createInvoice: jest.fn(),
        };

        const routerMock = {
            navigate: jest.fn(),
        };

        TestBed.configureTestingModule({
            providers: [
                JobAdFormStore,
                { provide: JobAdsService, useValue: jobAdsServiceMock },
                { provide: InvoicesService, useValue: invoicesServiceMock },
                { provide: Router, useValue: routerMock },
            ],
        });

        store = TestBed.inject(JobAdFormStore);
        jobAdsService = TestBed.inject(JobAdsService) as jest.Mocked<JobAdsService>;
        invoicesService = TestBed.inject(InvoicesService) as jest.Mocked<InvoicesService>;
        router = TestBed.inject(Router) as jest.Mocked<Router>;
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
    });

    it('should load job ad data', (done) => {
        jobAdsService.getJobAd.mockReturnValue(of(jobAd));
        store.loadJobAdData({ id: '1' });
        store.jobAd$.subscribe((data) => {
            expect(data).toEqual(jobAd);
            done();
        });
    });

    it('should handle error when loading job ad data', (done) => {
        const error = { error: 'Failed to load job ad' };
        jobAdsService.getJobAd.mockReturnValue(throwError(error));
        store.loadJobAdData({ id: '1' });
        store.jobAdErrors$.subscribe((errors) => {
            expect(errors).toEqual(error);
            done();
        });
    });

    it('should save job ad data', (done) => {
        jobAdsService.createJobAd.mockReturnValue(of(jobAd));
        store.saveJobAd(of(jobAd));
        store.jobAd$.subscribe((data) => {
            expect(data).toEqual(jobAd);
            done();
        });
    });

    it('should trigger create invoice when conditions are met', (done) => {
        store.patchState({
            jobAd: { ...jobAd, status: 'published' },
            saved: true,
        });
        store.triggerCreateInvoice();
        store.jobAdEmbedded$.subscribe((data) => {
            expect(invoicesService.createInvoice).toHaveBeenCalledWith('1', {});
            done();
        });
    });


});
