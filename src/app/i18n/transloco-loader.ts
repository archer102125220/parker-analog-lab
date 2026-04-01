import {
  // inject,
  Injectable
} from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
// import { of } from 'rxjs';

// === 動態 import 所需的設定已不需要寫在檔案最上方 ===
// import en from './en.json';
// import zhTW from './zh-TW.json';

// const translations: Record<string, Translation> = {
//   'en': en as unknown as Translation,
//   'zh-TW': zhTW as unknown as Translation
// };

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  // === 第一版做法 (透過 HTTP 呼叫 json) ===
  // 說明：原本是在執行時期(runtime)透過瀏覽器發送 HTTP 請求取得 json 檔案。
  // private readonly http = inject(HttpClient);
  // getTranslation(lang: string) {
  //   return this.http.get<Translation>(`/i18n/${lang}.json`);
  // }
  // =====================================

  // === 第二版做法 (靜態 import) ===
  // 說明：將 JSON 直接以 import 方式引入，Vite/Webpack 會在編譯時將內容直接打包進 JS bundle 中。
  // 優點：不需要發送額外的 HTTP 請求。缺點：如果語系檔很大，會增加初始 bundle size。
  // getTranslation(lang: string) {
  //   return of(translations[lang] || translations['zh-TW']);
  // }
  // =====================================

  // === 第三版最新做法 (動態 import) ===
  // 說明：利用打包工具(Vite/Webpack)的 Code Splitting 機制，將語系檔分離為獨立 Chunk。
  // 優點：保留了不需手動發 HTTP 請求(開發體驗好)，且只有當切換語系時才會載入該 Chunk，不佔用初始 Bundle 體積。
  getTranslation(lang: string) {
    if (lang === 'en') {
      return import('./en.json').then((m) => m.default as unknown as Translation);
    }
    // 預設與其他 fallback 載入繁體中文
    return import('./zh-TW.json').then((m) => m.default as unknown as Translation);
  }
}
