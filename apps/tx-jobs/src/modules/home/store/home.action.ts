import { createAction, props } from '@ngrx/store';

export const loadJobAds = createAction('[Home - Job Ads Page]');
export const loadJobAdsSuccess = createAction('[Home - Job Ads Page success]',
    props<{ jobAds: any[] }>());
export const loadJobAdsError = createAction('[Home - Job Ads Page error]',
    props<{ error: string }>());
