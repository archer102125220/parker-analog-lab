import { mergeApplicationConfig, type ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideTranslocoLoader } from '@jsverse/transloco';

import { appConfig } from './app.config';
import { TranslocoServerLoader } from './transloco-loader.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideTranslocoLoader(TranslocoServerLoader),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
