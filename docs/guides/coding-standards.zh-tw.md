# Parker Analog Lab - 程式碼規範

> 本文件定義了本專案必須遵守的程式碼規範。
> 這些規則是強制性的，應由 AI agent 和人類開發者共同遵守。

[English](./coding-standards.md) | [繁體中文](./coding-standards.zh-tw.md)

---

## 1. TypeScript 規範

### 1.1 型別安全 (強制)

- **永遠不要使用 `any` 型別** - 使用精確的型別定義、泛型或 `unknown` 替代
- **使用 `as unknown as TargetType`** 進行型別斷言（雙重斷言）
- **永遠不要使用 `as any`** - 始終使用 `as unknown as TargetType` 更安全的斷言
- **添加解釋性註解** - 使用型別斷言時解釋原因

```typescript
// ❌ 禁止
function processData(data: any) { }
const element = document.getElementById('id') as any;

// ✅ 正確
function processData<T extends { value: unknown }>(data: T) { }
const element = document.getElementById('id') as unknown as CustomElement;
```

### 1.2 執行時期資料驗證 (嚴格)

為確保穩健性，請始終根據變數的初始狀態使用嚴格的型別檢查。

| 型別 | 禁止使用 | 務必使用 |
|------|----------|----------|
| **字串** | `if (str)` | `if (str !== '')` |
| **數字** | `if (num)` | `typeof num === 'number'`, `num !== 0`, `Number.isFinite(num)` |
| **物件** | `if (obj)` | `typeof obj === 'object' && obj !== null`<br>`if (obj instanceof MyClass)` |
| **陣列** | `if (arr)` | `Array.isArray(arr) && arr.length > 0` |
| **相等性** | `==`, `!=` | `===`, `!==` |

---

## 2. CSS/SCSS 規範

### 2.1 BEM 命名規範 (強制)

本專案使用**改良版 BEM** 命名規範：

| 元素類型 | 格式 | 範例 |
|----------|------|------|
| Block（區塊） | 單一名稱 | `.countdown` |
| Element（元素） | 連字號 `-` | `.countdown-title` |
| Sub-Element（子元素） | 連字號 `-` | `.countdown-title-icon` |
| 多詞名稱 | 底線 `_` | `.image_upload`, `.content_box` |
| 狀態/修飾符 | HTML 屬性 | `[css-is-active='true']` |

#### 關鍵規則：
- **每個元素都必須有自己的唯一 class**
- **使用 `-`（連字號）** 連接區塊與元素：`.block-element`
- **使用 `_`（底線）** 用於單一區段內的多詞名稱：`.image_upload`
- **永遠不要使用 `__`（雙底線）或 `--`（雙連字號）**
- **狀態用 HTML 屬性必須以 `css-` 開頭**：`css-is-active`
- **CSS 變數必須使用 `_`（底線）**：`--editor_height`

### 2.2 Angular 特定規範

- 在 template 中綁定狀態屬性時使用 `[attr.css-is-active]="isActive ? 'true' : null"`。
