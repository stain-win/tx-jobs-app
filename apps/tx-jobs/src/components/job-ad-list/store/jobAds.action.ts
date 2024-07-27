import { createAction, props } from '@ngrx/store';

export const loadJobAds = createAction('[JobAds - Ads List]', props<{ published: boolean }>());
export const deleteJobAd = createAction('[JobAds - Delete Ad]', props<{ id: string }>());
export const searchJobAds = createAction('[JobAds - Search Ads]', props<{ query: string }>());
export const loadJobAdsSuccess = createAction('[JobAds - Ads List success]',
    props<{ jobAds: any[] }>());
export const loadJobAdsError = createAction('[JobAds - Ads List error]',
    props<{ error: string }>());
