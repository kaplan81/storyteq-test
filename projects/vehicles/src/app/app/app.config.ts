import { provideHttpClient } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { Config } from '@vehicles/app/models/config.model';
import { Observable } from 'rxjs';
import { routes } from './app.routes';
import { ConfigService } from './services/config/config.service';

export function appInitializerFactory(configService: ConfigService): () => Observable<Config> {
  return () => configService.loadConfig();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [ConfigService],
      multi: true,
    },
    // provideRouter(routes, withDebugTracing()),
    provideRouter(routes),
  ],
};
