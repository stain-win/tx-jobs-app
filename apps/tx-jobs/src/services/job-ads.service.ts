import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlOptions, ApiUrlService } from '@tx/core';
import { delay, filter, map, Observable } from 'rxjs';
import { JobAdDto } from '../models/job';

@Injectable({
    providedIn: 'root'
})
export class JobAdsService {
    private _url: ApiUrlOptions = {
        apiPath: 'jobs',
        apiVersion: '',
    };

    constructor(protected _http: HttpClient, protected _apiUrlService: ApiUrlService) {
    }

    getJobAds(): Observable<JobAdDto[]>  {
        return this._http.get<JobAdDto[]>(this._apiUrlService.createApiUrl('', this._url));
    }

    getJobAdsPublished(): Observable<JobAdDto[]>  {
        return this.getJobAds().pipe(map((jobAds) => jobAds.filter((jobAd) => jobAd.status === 'published')))
            .pipe(delay(1000));
    }

    getJobAd(id: string): Observable<JobAdDto> {
        return this._http.get<JobAdDto>(this._apiUrlService.createApiUrl(`/${id}`, this._url))
            .pipe(delay(1000));
    }

    getJobAdPublished(id: string): Observable<JobAdDto> {
        return this.getJobAd(id).pipe(filter((jobAd: any) => jobAd.status === 'published'));
    }
}
