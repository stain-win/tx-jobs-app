import { createFeatureSelector } from '@ngrx/store';
import { homeFeatureKey, HomeState } from './home.reducer';

export const getHomeState = createFeatureSelector<HomeState>(homeFeatureKey);
export const getJobAds = (state: HomeState) => state.jobAds;
export const getError = (state: HomeState) => state.error;
export const getIsLoading = (state: HomeState) => state.isLoading;
