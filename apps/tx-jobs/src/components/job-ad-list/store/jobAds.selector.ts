import { createFeatureSelector, createSelector } from '@ngrx/store';
import { jobAdsFeatureKey, JobAdsState } from './jobAds.reducer';

export const getJobAdsState = createFeatureSelector<JobAdsState>(jobAdsFeatureKey);

export const getJobAds = createSelector(
    getJobAdsState, (s) => s.jobAds
);


export const getError = createSelector(
    getJobAdsState, (s) => s.error
);

export const getIsLoading = createSelector(
    getJobAdsState, (s) => s.isLoading
);
