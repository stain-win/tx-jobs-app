import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiUrlOptions, ApiUrlService } from '@tx/core';
import { delay, Observable } from 'rxjs';
import { JobAdDto, JobAdStatus } from '../models/job';
import { jobBody } from '../helpers/job';

@Injectable({
    providedIn: 'root'
})
export class JobAdsService {
    private _url: ApiUrlOptions = { apiPath: 'jobs', apiVersion: '' };
    private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private _http: HttpClient, private _apiUrlService: ApiUrlService) {}

    getJobAds(published: boolean = false): Observable<JobAdDto[]> {
        const apiOptions =
            { ...this._url, queryParams: published ? { status: JobAdStatus.PUBLISHED } : undefined };
        return this._http.get<JobAdDto[]>(this._apiUrlService.createApiUrl('', apiOptions));
    }

    getJobAd(id: string, published: boolean = false, embed: boolean = false): Observable<JobAdDto> {
        const queryParams = {
            ...( published ? { status: JobAdStatus.PUBLISHED } : undefined),
            ...( embed ? { _embed: 'invoices' }: {})
        };
        const apiOptions = { ...this._url, queryParams };
        return this._http.get<JobAdDto>(this._apiUrlService.createApiUrl(`/${id}`, apiOptions)).pipe(delay(1000));
    }

    createJobAd(jobAd: JobAdDto): Observable<JobAdDto> {
        return this._http.post<JobAdDto>(
            this._apiUrlService.createApiUrl('', this._url),
            jobBody(jobAd));
    }

    editJobAd(jobAd: JobAdDto): Observable<JobAdDto> {
        return this._http.put<JobAdDto>(
            this._apiUrlService.createApiUrl(`/${jobAd.id}`, this._url),
            jobBody(jobAd));
    }

    deleteJobAd(id: string): Observable<[]> {
        return this._http.delete<[]>(this._apiUrlService.createApiUrl(`/${id}`, this._url));
    }

    searchJobAds(query: string): Observable<JobAdDto[]> {
        const apiOptions = { ...this._url, queryParams: { q: query } };
        return this._http.get<JobAdDto[]>(
            this._apiUrlService.createApiUrl('', apiOptions)
        );
    }
}
