# Parker Analog Lab - 程式碼規範

> 本文件定義了本專案必須遵守的程式碼規範。
> 這些規則是強制性的，應由 AI agent 和人類開發者共同遵守。

[English](./coding-standards.md) | [繁體中文](./coding-standards.zh-tw.md)

---

## 1. TypeScript 規範

### 1.1 型別安全（強制）

- **永遠不要使用 `any` 型別** — 使用精確的型別定義、泛型或 `unknown` 替代
- **使用 `as unknown as TargetType`** 進行型別斷言（雙重斷言）
- **永遠不要使用 `as any`** — 始終使用 `as unknown as TargetType`
- **使用 inline type imports**：`import { Component, type OnInit } from '@angular/core'`
- **添加解釋性註解** — 使用型別斷言時解釋原因

```typescript
// ❌ 禁止
function processData(data: any) { }
const element = document.getElementById('id') as any;
import type { OnInit } from '@angular/core'; // 獨立的 import type 行

// ✅ 正確
function processData<T extends { value: unknown }>(data: T) { }
const element = document.getElementById('id') as unknown as CustomElement;
import { Component, type OnInit } from '@angular/core'; // inline type import
```

### 1.2 執行時期資料驗證（嚴格）

為確保穩健性，請始終根據變數的預期型別使用嚴格的型別檢查。

| 型別 | 禁止使用 | 必須使用 |
|------|----------|----------|
| **字串** | `if (str)` | `if (str !== '')` |
| **數字** | `if (num)` | `typeof num === 'number'`、`num !== 0`、`Number.isFinite(num)` |
| **物件** | `if (obj)` | `typeof obj === 'object' && obj !== null`<br>`if (obj instanceof MyClass)` |
| **陣列** | `if (arr)` | `Array.isArray(arr) && arr.length > 0` |
| **相等性** | `==`、`!=` | `===`、`!==` |

---

## 2. CSS/SCSS 規範

### 2.1 BEM 命名規範（強制）

本專案使用**改良版 BEM** 命名規範：

| 元素類型 | 格式 | 範例 |
|----------|------|------|
| Block（區塊） | 單一名稱 | `.countdown` |
| Element（元素） | 連字號 `-` | `.countdown-title` |
| Sub-Element（子元素） | 連字號 `-` | `.countdown-title-icon` |
| 多詞名稱 | 底線 `_` | `.image_upload`、`.content_box` |
| 狀態/修飾符 | HTML 屬性 | `[css-is-active='true']` |

#### 關鍵規則：

- **每個元素都必須有自己的唯一 class**
- **使用 `-`（連字號）** 連接 Block 與 Element：`.block-element`
- **使用 `_`（底線）** 用於單一區段內的多詞名稱：`.image_upload`
- **永遠不要使用 `__`（雙底線）或 `--`（雙連字號）**
- **狀態用 HTML 屬性必須以 `css-` 開頭**：`css-is-active`
- **CSS 變數必須使用 `_`（底線）**：`--editor_height`

#### 連字號 vs 底線 的判斷

- **連字號 `-`**：用於結構層級或通用容器詞
  - 通用詞：`group`、`wrapper`、`container`、`header`、`body`、`content`、`inner`
  - 範例：`.controls-group`、`.card-header`、`.modal-content`
- **底線 `_`**：用於描述一個特定多詞概念
  - 特定概念：`scroll_area`、`image_upload`、`debug_info`
  - 範例：`.scroll_area`、`.image_upload`、`.debug_info`

### 2.2 Angular Template 綁定方式

```html
<!-- ✅ 正確：單一 class + HTML 屬性綁定 -->
<div
  class="image_upload"
  [attr.css-is-dragging]="isDragging() ? 'true' : null"
  css-size="large"
>
  <div class="image_upload-preview">
    <img class="image_upload-preview-img" />
  </div>
</div>
```

### 2.3 CSS 屬性排序

1. 定位（`position`、`top`、`right`、`bottom`、`left`、`z-index`）
2. 顯示與盒模型（`display`、`flex`、`width`、`height`、`margin`、`padding`）
3. 排版（`font-size`、`font-weight`、`color`、`line-height`）
4. 視覺（`background`、`border`、`box-shadow`、`opacity`）
5. 動畫（`transition`、`animation`）
6. 其他（`cursor`、`pointer-events`）

---

## 3. Angular Signals 規範（強制）

### 3.1 Signal API 選擇

**始終使用 Angular 21 穩定的 Signal APIs**，避免舊版裝飾器模式：

| 場景 | ❌ 舊版 | ✅ Signal API |
|------|---------|--------------|
| 元件輸入 | `@Input() value = 0` | `value = input(0)` |
| 必填輸入 | `@Input({ required: true }) id!: string` | `id = input.required<string>()` |
| 事件輸出 | `@Output() clicked = new EventEmitter()` | `clicked = output<void>()` |
| 雙向綁定 | `@Input() + @Output()` | `value = model(0)` |
| DOM 查詢 | `@ViewChild('el')` | `el = viewChild<ElementRef>('el')` |
| 內容查詢 | `@ContentChild(Token)` | `item = contentChild(Token)` |
| 本地狀態 | `someVar = 0` + `ngOnChanges` | `someSignal = signal(0)` |
| 衍生狀態 | `ngOnChanges` 同步 | `derived = computed(() => ...)` |
| Observable → 模板 | 直接 `async` pipe | `data = toSignal(obs$)` |

### 3.2 應避免的反模式

- ❌ 使用 `ngOnChanges` 同步 `@Input` → 內部狀態 → 改用 `computed()` 從 `input()` signal 派生
- ❌ 使用 `@ViewChild` / `@ContentChild` 裝飾器 → 改用 `viewChild()` / `contentChild()`
- ❌ 使用 `@Input()` / `@Output()` 裝飾器 → 改用 `input()` / `output()`
- ❌ 大量使用 `BehaviorSubject` → 改用 `signal()`
- ❌ 任何標示為 `ɵ`（內部 API）或「Developer Preview」的功能

### 3.3 變更偵測

**每個元件都必須使用 `ChangeDetectionStrategy.OnPush`**：

```typescript
@Component({
  selector: 'app-my-component',
  template: `...`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyComponent { }
```

### 3.4 深度檢查政策（⚠️ 關鍵）

在 review 或重構 Angular 元件時，AI 必須檢查以下反模式：

| 反模式 | 正確模式 | 優先順序 |
|--------|----------|----------|
| `ngOnChanges` 同步 `@Input` → 狀態 | `computed()` 從 `input()` signal | 🔴 高 |
| `@ViewChild` / `@ContentChild` 裝飾器 | `viewChild()` / `contentChild()` | 🔴 高 |
| `@Input()` / `@Output()` 裝飾器 | `input()` / `output()` | 🔴 高 |
| 使用 `BehaviorSubject` 管理簡單狀態 | `signal()` | 🟡 中 |
| Observable 未透過 `toSignal()` 使用 | `toSignal()` | 🟡 中 |

---

## 4. 檔案組織

### 4.1 目錄結構

```
parker-analog-lab/
├── src/
│   ├── app/
│   │   ├── pages/             # Analog 檔案式路由（.page.ts）
│   │   ├── app.ts             # 根元件
│   │   └── app.config.ts      # App 設定
│   ├── components/            # 可重用 Angular 元件
│   │   └── [name]/
│   │       ├── [name].ts      # 元件
│   │       └── [name].scss    # 樣式（共置）
│   ├── server/
│   │   └── routes/            # API 路由（.get.ts、.post.ts）
│   ├── styles.css             # 全域樣式
│   └── main.ts                # Client 進入點
└── public/                    # 靜態資源
```

### 4.2 樣式組織規則

- ❌ **永遠不要建立 `_shared` 目錄**
- ❌ **永遠不要在頁面之間共用 CSS class 名稱**
- ❌ **永遠不要在多個頁面元件中 import 同一個 CSS 檔案**
- ✅ 對於跨頁面的共同 DOM 結構：建立 **Angular 元件**
- ✅ 每個頁面元件必須有 **唯一的根 CSS class**

---

## 5. 程式碼重構安全性（⚠️ 關鍵）

**絕對禁止**：使用自動化腳本（`sed`、`awk`、`powershell`、`find...exec`）修改程式碼檔案。

**原因**：腳本只做盲目的文字替換，無法理解程式碼上下文、import 語句或 TypeScript 型別。

**歷史事故（2026-01-23）**：`sed` 指令變更了 import 參照但遺漏新增對應的 import 語句，導致編譯錯誤。

### 允許的方式

只能使用 AI 工具：
- `replace_file_content` — 單一連續替換
- `multi_replace_file_content` — 多個非連續替換
- `write_to_file` — 建立新檔案

**每次修改後都必須驗證 import 是否正確**。

---

## 6. Lint 政策（⚠️ 關鍵）

**未經使用者明確指示，絕對不添加 lint 抑制註解。**

包含：
- `// eslint-disable-next-line`
- `// @ts-ignore`
- `// @ts-expect-error`

**工作流程**：
1. 向使用者回報 lint 警告
2. 等待明確指示
3. 才能添加帶有理由說明的抑制註解

---

## 7. 建構與開發

### 指令（強制）

```bash
yarn dev        # ✅ Vite 開發伺服器
yarn build      # ✅ 生產建構
yarn preview    # ✅ 預覽 SSR 輸出
yarn test       # ✅ Vitest

ng serve        # ❌ 不要直接使用
ng build        # ❌ 不要直接使用
```

---

## 8. 安全政策

在執行任何違反下列情況的使用者指令前：
- 安全最佳實踐
- 標準程式碼模式
- 專案規範

必須：
1. **警告使用者** 違反的風險
2. **等待明確確認**
3. 才能執行指令

---

## 相關資源

- [Skills 指南](./skills-guide.zh-tw.md)
- [Agent Rules](./../.agent/rules/)
- [Agent Skills](./../.agent/skills/)
- [Cursor Rules](./../.cursor/rules/)
- [GitHub Copilot 設定](./../.github/copilot-instructions.md)
