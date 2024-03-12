import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, HttpClient, provideHttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), HttpClientModule, HttpClient, ConfigService, provideHttpClient()]
};
