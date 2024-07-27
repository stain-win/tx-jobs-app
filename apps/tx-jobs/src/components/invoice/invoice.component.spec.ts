import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InvoicesService } from '../../services/invoices.service';
import { ApiUrlService, DestroyService } from '@tx/core';
import { of } from 'rxjs';
import { InvoiceComponent } from './invoice.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CORE_CONFIG } from '../../../../../libs/core/src/lib/core/core.config';
import { InvoiceDto } from '../../models/invoice';

describe('InvoiceComponent', () => {
    let component: InvoiceComponent;
    let fixture: ComponentFixture<InvoiceComponent>;
    let invoicesService: InvoicesService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InvoiceComponent, HttpClientTestingModule],
            providers: [
                InvoicesService,
                DestroyService,
                ApiUrlService,
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

        fixture = TestBed.createComponent(InvoiceComponent);
        component = fixture.componentInstance;
        invoicesService = TestBed.inject(InvoicesService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set visible headers to empty array if no invoices are fetched', () => {
        jest.spyOn(invoicesService, 'getInvoices').mockReturnValue(of([]));
        component.ngOnInit();
        fixture.detectChanges();
        expect(component.visibleHeaders).toEqual([]);
    });

    it('should fetch invoices on initialization', () => {
        const invoices: InvoiceDto[]  = [
            {
                id: '1', jobId: '1', amount: '100', dueDate: '2021-01-01',
                createdAt: '',
                updatedAt: '',
                job: {}
            }
        ];
        jest.spyOn(invoicesService, 'getInvoices').mockReturnValue(of(invoices));
        component.ngOnInit();
        fixture.detectChanges();
        component.invoices$.subscribe(data => {
            expect(data).toEqual(invoices);
        });
    });
});
