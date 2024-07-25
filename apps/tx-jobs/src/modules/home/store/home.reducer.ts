import { JobAdDto } from '../../../models/job';
import { createReducer, on } from '@ngrx/store';
import { loadJobAds, loadJobAdsError, loadJobAdsSuccess } from './home.action';

export interface HomeState {
    jobAds: JobAdDto[];
    error: string | null;
    isLoading: boolean;
}

const initialState: HomeState = {
    jobAds: [],
    error: null,
    isLoading: false,
}

export const homeFeatureKey = 'home';
export const homeReducer = createReducer(
    initialState,
    on(loadJobAds, (state) => ({ ...state, isLoading: true, error: null })),
    on(loadJobAdsSuccess, (state, { jobAds }) => ({ ...state, jobAds, isLoading: false })),
    on(loadJobAdsError, (state, { error }) => ({ ...state, error, isLoading: false }))
)
