import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Observable, of } from 'rxjs';

/**
 * Server-side Transloco loader.
 * During SSR, Angular cannot use HttpClient to load static assets,
 * so we read the translation JSON files directly from the filesystem.
 */
@Injectable({ providedIn: 'root' })
export class TranslocoServerLoader implements TranslocoLoader {
  getTranslation(lang: string): Observable<Translation> {
    // Analog outputs to dist/analog/public; in dev mode the root is the project root
    const filePath = join(process.cwd(), 'public', 'i18n', `${lang}.json`);
    const content = readFileSync(filePath, 'utf-8');
    return of(JSON.parse(content) as Translation);
  }
}
