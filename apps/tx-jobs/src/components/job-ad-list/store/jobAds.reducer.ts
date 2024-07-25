import { JobAdDto } from '../../../models/job';
import { createReducer, on } from '@ngrx/store';
import { loadJobAds, loadJobAdsError, loadJobAdsSuccess } from './jobAds.action';

export interface JobAdsState {
    jobAds: JobAdDto[];
    error: string | null;
    isLoading: boolean;
}

const initialState: JobAdsState = {
    jobAds: [],
    error: null,
    isLoading: false,
}

export const jobAdsFeatureKey = 'jobAds';
export const jobAdsReducer = createReducer(
    initialState,
    on(loadJobAds, (state) => ({ ...state, isLoading: true, error: null })),
    on(loadJobAdsSuccess, (state, { jobAds }) => ({ ...state, jobAds, isLoading: false })),
    on(loadJobAdsError, (state, { error }) => ({ ...state, error, isLoading: false }))
)
