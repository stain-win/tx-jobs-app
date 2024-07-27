import {
    ApplicationConfig,
    provideZoneChangeDetection,
    isDevMode,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@tx/core';
import { coreAppConfig } from '../../../../libs/core/src/lib/core/core.config';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { jobAdsFeatureKey, jobAdsReducer } from '../components/job-ad-list/store/jobAds.reducer';
import { JobAdsEffect } from '../components/job-ad-list/store/jobAds.effect';
import { apiInterceptor } from '../../../../libs/core/src/lib/core/interceptors/api.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideStoreDevtools({
            logOnly: !isDevMode(),
            maxAge: 15,
            autoPause: true,
        }),
        provideEffects([JobAdsEffect]),
        provideStore({[jobAdsFeatureKey]: jobAdsReducer}),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes, withComponentInputBinding()),
        provideHttpClient(withInterceptors([apiInterceptor, authInterceptor])),
        provideAnimationsAsync(),
        ...coreAppConfig.providers,
    ],
};
