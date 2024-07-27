import {ApplicationConfig, InjectionToken} from '@angular/core';
import {environment, Environment} from '@tx/core/environment';
import { TitleStrategy } from '@angular/router';
import { TitlePrefix } from '@tx/core';

export interface CoreConfig {
    environment: Environment;
}

export const CORE_CONFIG = new InjectionToken<CoreConfig>('CoreConfig');
export const coreAppConfig: ApplicationConfig = {
    providers: [
        {
            provide: CORE_CONFIG,
            useValue: {
                environment
            }
        },
        { provide: TitleStrategy, useClass: TitlePrefix }
    ],
}
