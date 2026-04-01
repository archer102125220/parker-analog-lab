import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
// import { readFileSync } from 'node:fs';
// import { join } from 'node:path';
// import { Observable, of } from 'rxjs';

// === 動態 import 所需的設定已不需要寫在檔案最上方 ===
// import en from './en.json';
// import zhTW from './zh-TW.json';

// const translations: Record<string, Translation> = {
//   'en': en as unknown as Translation,
//   'zh-TW': zhTW as unknown as Translation
// };

/**
 * Server-side Transloco loader.
 */
@Injectable({ providedIn: 'root' })
export class TranslocoServerLoader implements TranslocoLoader {
  // === 第一版做法 (透過 Node fs 讀取 json) ===
  // 說明：SSR 期間，原本是透過 Node.js 檔案系統(fs)同步讀取 json 檔案內容並解析。
  // getTranslation(lang: string): Observable<Translation> {
  //   const filePath = join(process.cwd(), 'public', 'i18n', `${lang}.json`);
  //   const content = readFileSync(filePath, 'utf-8');
  //   return of(JSON.parse(content) as Translation);
  // }
  // =====================================

  // === 第二版做法 (靜態 import) ===
  // 說明：與 Client 端一致，直接使用 import 將 JSON 包進去，不需讀取外部檔案。
  // getTranslation(lang: string): Observable<Translation> {
  //   return of(translations[lang] || translations['zh-TW']);
  // }
  // =====================================

  // === 第三版最新做法 (動態 import) ===
  // 說明：SSR 也支援 Vite 的 Code Splitting (動態 import)。
  // 原理與 Client 端相同，將載入成本分散到實際需要時才載入該模組。
  getTranslation(lang: string): Promise<Translation> {
    if (lang === 'en') {
      return import('./en.json').then((m) => m.default as unknown as Translation);
    }
    // 預設與其他 fallback 載入繁體中文
    return import('./zh-TW.json').then((m) => m.default as unknown as Translation);
  }
}
