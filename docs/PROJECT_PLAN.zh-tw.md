# Parker Analog Lab — 專案開發計劃

> 此文件記錄 `parker-analog-lab` 的功能開發計劃。  
> 目標：對標 `parker-nextjs-lab` 已完成的所有功能，以 Angular + Analog 技術棧重新實作。

---

## 技術棧說明

| 項目 | Next.js Lab | Analog Lab |
|------|------------|------------|
| 框架 | Next.js 15 (React) | Analog 2.x (Angular 21) |
| 語言 | TypeScript + TSX | TypeScript + Angular Signals |
| 樣式 | SCSS Modules | Tailwind CSS v4 |
| 路由 | App Router (`/app/[locale]`) | File-based Router (`/src/app/pages`) |
| SSR | Next.js SSR/SSG | Vite + Angular SSR |
| i18n | next-intl | 待規劃 |
| 套件管理 | yarn | yarn |

---

## 第一階段：UI 風格確認（⚠️ 需與人類開發者確認後才能繼續）

> **[BLOCKED] 在首頁 UI 風格獲得人類開發者確認之前，後續所有功能開發計劃均暫停。**

### 首頁現況

目前 `parker-analog-lab` 的首頁（`/src/app/pages/index.page.ts`）使用 Analog 預設的 Welcome 頁面，沒有自訂 UI 設計。

### 需與開發者確認的事項

請開發者確認以下風格方向，再開始首頁實作：

1. **色彩主題**：沿用 Next.js Lab 當前配色？或 Analog Lab 要走獨立的新風格？
2. **暗色/亮色模式**：是否需要支援 Dark Mode？
3. **首頁佈局**：
   - 是否保留與 Next.js Lab 相同的「Hero + 分類卡片格」佈局？
   - 卡片樣式是否做差異化（例如：Angular 紅色主題）？
4. **Tailwind v4 使用範疇**：是否全站使用 Tailwind？或部分頁面用傳統 CSS？
5. **Logo / 圖示**：要用 Analog 官方 Logo 還是自訂的 Analog Lab Logo？

### 確認後的首頁實作任務

- [ ] 建立 `HomePageComponent`（替換掉 `AnalogWelcome`）
- [ ] 設計 Hero Section（Logo + 標題 + 副標題）
- [ ] 設計功能卡片 Grid（對應各子頁面的入口連結）
- [ ] 建立全域 Layout（`AppLayoutComponent` 取代 `app.ts` 的 inline 樣式）
- [ ] 確認 Tailwind v4 整合方式（`styles.css` 中的 `@import 'tailwindcss'`）

---

## 第二階段：基礎架構建設（首頁 UI 確認後開始）

### 2.1 全域 Layout 系統

- [ ] 建立 `LayoutModule` 或 Standalone Layout Component
- [ ] 建立 `<app-header>` 導覽列（語言切換、頁面連結）
- [ ] 建立 `<app-footer>` 頁尾
- [ ] 設定全域 CSS 變數（`styles.css`）
- [ ] 支援響應式設計（Mobile / Tablet / Desktop breakpoints）

### 2.2 國際化（i18n）

> Next.js Lab 使用 `next-intl`，Analog 需另行整合

- [ ] 評估並選擇 i18n 方案（`@angular/localize` 或 `transloco` 或 `ngx-translate`）
- [ ] 建立翻譯資源檔（`zh-TW` / `en`）
- [ ] 實作語系路由（`/zh-tw/...` 和 `/en/...`）
- [ ] 語言切換器 UI 元件

### 2.3 SEO 基礎

- [ ] 動態 `<title>` 與 `<meta description>` 設定
- [ ] OpenGraph / Twitter Card meta 标签
- [ ] `sitemap.xml` 生成
- [ ] `robots.txt` 設定
- [ ] JSON-LD 結構化資料元件（`JsonLdComponent`）

---

## 第三階段：自訂 UI 元件庫（/components 頁）

> 對標 Next.js Lab `/components` 頁中的所有子項目

### 元件開發清單

| 元件名稱 | Next.js Lab 路徑 | 狀態 |
|---------|----------------|------|
| Banner | `/components/Banner` | ⬜ 待開始 |
| Countdown | `/components/Countdown` | ⬜ 待開始 |
| Dialog | `/components/Dialog` | ⬜ 待開始 |
| DialogModal | `/components/DialogModal` | ⬜ 待開始 |
| Drawer | `/components/Drawer` | ⬜ 待開始 |
| GoTop | `/components/GoTop` | ⬜ 待開始 |
| ImageUpload | `/components/ImageUpload` | ⬜ 待開始 |
| Message / Toast | `/components/Message` | ⬜ 待開始 |
| PhoneInput | `/components/PhoneInput` | ⬜ 待開始 |
| QRCode | `/components/QRCode` | ⬜ 待開始 |
| ScrollFetch | `/components/ScrollFetch` | ⬜ 待開始 |
| Selector | `/components/Selector` | ⬜ 待開始 |
| SkeletonLoader | `/components/SkeletonLoader` | ⬜ 待開始 |
| SlideInPanel | `/components/SlideInPanel` | ⬜ 待開始 |
| SwiperCustom | `/components/SwiperCustom` | ⬜ 待開始 |
| SwiperJs | `/components/SwiperJs` | ⬜ 待開始 |
| SwitchButton | `/components/SwitchButton` | ⬜ 待開始 |
| Tabs | `/components/Tabs` | ⬜ 待開始 |
| VirtualScroller | `/components/VirtualScroller` | ⬜ 待開始 |
| WangEditor | `/components/WangEditor` | ⬜ 待開始 |

---

## 第四階段：功能頁面開發

### 自訂元件展示

| 頁面 | Next.js Lab 路徑 | Analog 目標路徑 | 狀態 |
|-----|----------------|----------------|------|
| 自訂元件展示 | `/components` | `/components` | ⬜ 待開始 |
| CSS 繪圖 | `/css-drawing` | `/css-drawing` | ⬜ 待開始 |
| Directive 特效 | `/directive-effects` | `/directive-effects` | ⬜ 待開始 |
| Krpano 720° VR | `/krpano-demo` | `/krpano-demo` | ⬜ 待開始 |

### 即時通訊

| 頁面 | Next.js Lab 路徑 | Analog 目標路徑 | 狀態 |
|-----|----------------|----------------|------|
| WebRTC 視訊 | `/web-rtc` | `/web-rtc` | ⬜ 待開始 |
| Socket.IO | `/socket-test` | `/socket-test` | ⬜ 待開始 |
| Server-Sent Events | `/server-sent-event-test` | `/server-sent-events` | ⬜ 待開始 |

### AI / 裝置整合

| 頁面 | Next.js Lab 路徑 | Analog 目標路徑 | 狀態 |
|-----|----------------|----------------|------|
| 臉部替換 | `/face-swap` | `/face-swap` | ⬜ 待開始 |
| 網路攝影機 | `/web-cam` | `/web-cam` | ⬜ 待開始 |
| WebAuthn 生物辨識 | `/web-authn` | `/web-authn` | ⬜ 待開始 |

### 開發者工具 / Demo

| 頁面 | Next.js Lab 路徑 | Analog 目標路徑 | 狀態 |
|-----|----------------|----------------|------|
| Firebase 整合 | `/firebase` | `/firebase` | ⬜ 待開始 |
| IndexedDB Demo | `/indexeddb-demo` | `/indexeddb-demo` | ⬜ 待開始 |
| Hooks / Signals 測試 | `/hooks-test` | `/signals-test` | ⬜ 待開始 |
| 路由示範 | `/route` | `/route` | ⬜ 待開始 |
| 關於頁面 | `/about` | `/about` | ⬜ 待開始 |
| 前端 API 快取測試 | `/frontend-api-cache-test` | `/api-cache-test` | ⬜ 待開始 |

### 知識庫

| 頁面 | Next.js Lab 路徑 | Analog 目標路徑 | 狀態 |
|-----|----------------|----------------|------|
| 技術筆記 | `/notes` | `/notes` | ⬜ 待開始 |

---

## 第五階段：進階功能（選擇性）

- [ ] PWA 離線支援（参考 Next.js Lab `/offline` 頁）
- [ ] Service Worker 整合
- [ ] Google Tag Manager / Analytics 整合
- [ ] Google Cloud Messaging 推播通知
- [ ] Web Push Notification 權限請求元件
- [ ] 壓力測試工具整合

---

## 開發注意事項

### Angular Signals 最佳實踐

> 詳見 `.claude/rules/angular-signals.md`

- 優先使用 `signal()` / `computed()` / `effect()` 取代傳統 `@Input()` + `ngOnChanges`
- 使用 Standalone Components（不建立 Module）
- 使用 `inject()` 取代 Constructor Injection

### CSS 命名規範

> 詳見 `docs/guides/coding-standards.zh-tw.md`

- 遵守 BEM 命名慣例（`block__element--modifier`）
- 元件樣式優先使用 Tailwind v4 utility classes
- 複雜客製樣式使用 `styles[]` 或獨立 `.css` 檔案

### 元件建立規範

> 詳見 `.claude/commands/component.md`

- 路徑：`/src/app/components/<ComponentName>/<component-name>.ts`
- 每個元件為 Standalone Component
- 測試檔案放在 `<ComponentName>/<component-name>.spec.ts`

---

## 進度追蹤摘要

| 階段 | 說明 | 狀態 |
|------|------|------|
| Phase 0 | 計劃文件建立 | ✅ 已完成 |
| Phase 1 | UI 風格與人類開發者確認 | ⚠️ 等待確認 |
| Phase 2 | 基礎架構建設 | ⬜ 待開始 |
| Phase 3 | UI 元件庫開發（20+ 元件） | ⬜ 待開始 |
| Phase 4 | 功能頁面開發（16+ 頁） | ⬜ 待開始 |
| Phase 5 | 進階功能（PWA、推播等） | ⬜ 選擇性 |

---

*最後更新：2026-03-29*
