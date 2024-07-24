import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {appRoutes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from '@tx/core';
import {coreAppConfig} from '../../../../libs/core/src/lib/core/core.config';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(appRoutes, withComponentInputBinding()),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideAnimationsAsync(),
        ...coreAppConfig.providers
    ],
};
