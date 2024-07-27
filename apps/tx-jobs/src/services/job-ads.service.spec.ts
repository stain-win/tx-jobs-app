import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JobAdsService } from './job-ads.service';
import { ApiUrlService } from '@tx/core';
import { JobAdDto, JobAdStatus } from '../models/job';
import { jobBody } from '../helpers/job';
const mockJobAds: JobAdDto[] = [
    {
        id: '1',
        title: 'Job 1', status: JobAdStatus.PUBLISHED,
        createdAt: '',
        updatedAt: '',
        invoices: [],
        description: '',
        skills: []
    }
];
describe('JobAdsService', () => {
    let service: JobAdsService;
    let httpMock: HttpTestingController;
    let apiUrlService: jest.Mocked<ApiUrlService>;

    beforeEach(() => {
        const apiUrlServiceMock = {
            createApiUrl: jest.fn()
        };

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                JobAdsService,
                { provide: ApiUrlService, useValue: apiUrlServiceMock }
            ]
        });

        service = TestBed.inject(JobAdsService);
        httpMock = TestBed.inject(HttpTestingController);
        apiUrlService = TestBed.inject(ApiUrlService) as jest.Mocked<ApiUrlService>;
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should make an HTTP GET request to the correct URL in getJobAds', () => {

        apiUrlService.createApiUrl.mockReturnValue('http://localhost:3000/api/jobs');

        service.getJobAds(true).subscribe(jobAds => {
            expect(jobAds).toEqual(mockJobAds);
        });

        const req = httpMock.expectOne('http://localhost:3000/api/jobs');
        expect(req.request.method).toBe('GET');
        req.flush(mockJobAds);
    });

    it('should make an HTTP GET request to the correct URL with parameters in getJobAd', () => {
        apiUrlService.createApiUrl.mockReturnValue('http://localhost:3000/api/jobs/1');

        service.getJobAd('1', true, true).subscribe(jobAd => {
            expect(jobAd).toEqual(mockJobAds[0]);
        });

        const req = httpMock.expectOne('http://localhost:3000/api/jobs/1');
        expect(req.request.method).toBe('GET');
        req.flush(mockJobAds[0]);
    });


    it('should make an HTTP DELETE request to the correct URL in deleteJobAd', () => {
        apiUrlService.createApiUrl.mockReturnValue('http://localhost:3000/api/jobs/1');

        service.deleteJobAd('1').subscribe(response => {
            expect(response).toEqual([]);
        });

        const req = httpMock.expectOne('http://localhost:3000/api/jobs/1');
        expect(req.request.method).toBe('DELETE');
        req.flush([]);
    });

    it('should make an HTTP GET request to the correct URL with query parameters in searchJobAds', () => {
        apiUrlService.createApiUrl.mockReturnValue('http://localhost:3000/api/jobs?q=test');

        service.searchJobAds('test').subscribe(jobAds => {
            expect(jobAds).toEqual(mockJobAds);
        });

        const req = httpMock.expectOne('http://localhost:3000/api/jobs?q=test');
        expect(req.request.method).toBe('GET');
        req.flush(mockJobAds);
    });
});
