import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InvoicesService } from './invoices.service';
import { ApiUrlService } from '@tx/core';
import { InvoiceDto } from '../models/invoice';

const mockInvoices: InvoiceDto[]  = [
    {
        id: '1', jobId: '1', amount: '100', dueDate: '2021-01-01',
        createdAt: '',
        updatedAt: '',
        job: {}
    }
];

describe('InvoicesService', () => {
    let service: InvoicesService;
    let httpMock: HttpTestingController;
    let apiUrlService: jest.Mocked<ApiUrlService>;

    beforeEach(() => {
        const apiUrlServiceMock = {
            createApiUrl: jest.fn()
        };

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                InvoicesService,
                { provide: ApiUrlService, useValue: apiUrlServiceMock }
            ]
        });

        service = TestBed.inject(InvoicesService);
        httpMock = TestBed.inject(HttpTestingController);
        apiUrlService = TestBed.inject(ApiUrlService) as jest.Mocked<ApiUrlService>;
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should make an HTTP GET request to the correct URL in getInvoices', () => {
        apiUrlService.createApiUrl.mockReturnValue('http://localhost:3000/api/invoices');

        service.getInvoices().subscribe(invoices => {
            expect(invoices).toEqual(mockInvoices);
        });

        const req = httpMock.expectOne('http://localhost:3000/api/invoices');
        expect(req.request.method).toBe('GET');
        req.flush(mockInvoices);
    });

    it('should make an HTTP GET request to the correct URL with parameters in getInvoice', () => {

        apiUrlService.createApiUrl.mockReturnValue('http://localhost:3000/api/invoices/1');

        service.getInvoice('1').subscribe(invoice => {
            expect(invoice).toEqual(mockInvoices[0]);
        });

        const req = httpMock.expectOne('http://localhost:3000/api/invoices/1');
        expect(req.request.method).toBe('GET');
        req.flush(mockInvoices[0]);
    });

    it('should make an HTTP POST request to the correct URL with correct body and headers in createInvoice', () => {
        const invoiceBody = mockInvoices[0];
        apiUrlService.createApiUrl.mockReturnValue('http://localhost:3000/api/invoices');

        service.createInvoice('1', invoiceBody).subscribe(invoice => {
            expect(invoice).toEqual(mockInvoices[0]);
        });

        const req = httpMock.expectOne('http://localhost:3000/api/invoices');
        expect(req.request.method).toBe('POST');
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        req.flush(mockInvoices[0]);
    });
});
