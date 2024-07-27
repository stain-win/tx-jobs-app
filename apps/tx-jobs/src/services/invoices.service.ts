import { Injectable } from '@angular/core';
import { ApiUrlOptions, ApiUrlService } from '@tx/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InvoiceDto } from '../models/invoice';
import { invoiceBody } from '../helpers/invoice';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InvoicesService {
    private _url: ApiUrlOptions = {
        apiPath: 'invoices',
        apiVersion: ''
    };
    private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(protected _http: HttpClient, protected _apiUrlService: ApiUrlService) {
    }

    getInvoices(): Observable<InvoiceDto[]> {
        return this._http.get<InvoiceDto[]>(this._apiUrlService.createApiUrl('', this._url));
    }

    getInvoice(jobAdId: string): Observable<InvoiceDto> {
        return this._http.get<InvoiceDto>(this._apiUrlService.createApiUrl(`/${jobAdId}`, { ...this._url, queryParams: { jobAdId } }));
    }

    createInvoice(jobId: string,invoice: Partial<InvoiceDto>): Observable<InvoiceDto> {
        return this._http.post<InvoiceDto>(
            this._apiUrlService.createApiUrl('', this._url),
            invoiceBody(jobId, invoice),
            { headers: this._headers }
        );
    }

}
