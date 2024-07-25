import { createAction, props } from '@ngrx/store';

export const loadJobAds = createAction('[JobAds - Ads Page]');
export const loadJobAdsSuccess = createAction('[JobAds - Ads Page success]',
    props<{ jobAds: any[] }>());
export const loadJobAdsError = createAction('[JobAds - Ads Page error]',
    props<{ error: string }>());
