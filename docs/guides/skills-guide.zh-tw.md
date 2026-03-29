# Skills 指南 - Parker Analog Lab

本文件說明 Skills 系統如何引導 AI agent 完成複雜的場景任務。

[English](./skills-guide.md) | [繁體中文](./skills-guide.zh-tw.md)

---

## 什麼是 Skill？

**Skill** 是存儲在 `.agent/skills/[skill-name]/SKILL.md` 的詳細逐步指南。Skills 提供：
- 複雜選擇的決策樹
- 含程式碼範例的正確示範
- 應避免的常見錯誤
- 驗證用的清單

AI agent（Gemini、Claude、Cursor、Copilot）在執行對應任務前，應**閱讀並遵循**相關的 SKILL.md。

---

## 可用的 Skills

### 1. Angular Signals 選擇

**路徑**：`.agent/skills/angular-signals-selection/SKILL.md`

**使用時機**：
- 在 `signal()`、`computed()`、`effect()` 等之間做選擇
- 從舊版 `@Input()` / `@Output()` / `@ViewChild()` 裝飾器遷移
- 決定何時使用 `toSignal()` 轉換 Observable
- 建立需要響應式狀態的元件

**快速參考**：
| 場景 | Signal API |
|------|-----------|
| 元件輸入 | `input()` / `input.required()` |
| 事件發射 | `output()` |
| 雙向綁定 | `model()` |
| 本地狀態 | `signal()` |
| 衍生值 | `computed()` |
| DOM 參照 | `viewChild()` |
| Observable → 響應式 | `toSignal()` |

---

### 2. CSS/SCSS 命名規範

**路徑**：`.agent/skills/css-naming-convention/SKILL.md`

**使用時機**：
- 建立新的 CSS/SCSS class 名稱
- 對連字號（`-`）vs 底線（`_`）感到困惑
- 命名狀態、變體或修飾符屬性
- 建立頁面根 class 或元件根 class

**快速參考**：
- **連字號 `-`**：結構層級、通用容器（`group`、`header`、`content`）
- **底線 `_`**：多詞特定概念（`scroll_area`、`image_upload`）
- **HTML 屬性**：狀態和變體（`css-is-active`、`css-color`、`css-size`）

---

### 3. 程式碼重構安全性

**路徑**：`.agent/skills/code-refactoring-safety/SKILL.md`

**使用時機**：
- 計劃重構多個檔案
- 想使用 shell 腳本進行批次修改時
- 執行全域查找替換操作
- 在整個程式碼庫中遷移 API 模式

**關鍵規則**：**絕對不使用腳本**。只使用 `replace_file_content` 和 `multi_replace_file_content`。

---

### 4. 檔案組織

**路徑**：`.agent/skills/file-organization/SKILL.md`

**使用時機**：
- 決定新元件或頁面的位置
- 為新功能組織樣式
- 在多個頁面之間建立共用 UI 模式

---

### 5. Lint 政策

**路徑**：`.agent/skills/lint-policy/SKILL.md`

**使用時機**：
- 遇到 ESLint 或 TypeScript 錯誤
- 決定是修正還是抑制 lint 警告
- 需要添加 `eslint-disable` 或 `@ts-expect-error` 註解

**關鍵規則**：在請求抑制警告之前，始終嘗試**修正問題**。

---

### 6. 建構工具

**路徑**：`.agent/skills/build-tools/SKILL.md`

**使用時機**：
- 啟動開發伺服器
- 排查建構錯誤
- 設定環境變數
- 檢查 Vite 設定

---

## 如何使用 Skills

### 對 AI agent 而言

1. 從任務描述中辨識相關的 skill
2. 在進行之前完整閱讀 `SKILL.md`
3. 遵循決策樹和清單
4. 必要時參考相關規則

### 對開發者而言

Skills 組織如下：
```
.agent/skills/
├── angular-signals-selection/
│   └── SKILL.md
├── build-tools/
│   └── SKILL.md
├── code-refactoring-safety/
│   └── SKILL.md
├── css-naming-convention/
│   └── SKILL.md
├── file-organization/
│   └── SKILL.md
└── lint-policy/
    └── SKILL.md
```

---

## 相關規則

規則提供簡潔的常駐指引。Skills 提供深入的場景特定指南。

| 規則檔案 | 主題 |
|---------|------|
| `.agent/rules/angular-signals.md` | Signal API 選擇摘要 |
| `.agent/rules/build-tools.md` | Vite 指令摘要 |
| `.agent/rules/css-naming.md` | 改良版 BEM 摘要 |
| `.agent/rules/css-property-order.md` | CSS 屬性排序 |
| `.agent/rules/file-organization.md` | 檔案結構摘要 |
| `.agent/rules/lint-policy.md` | Lint 處理摘要 |
| `.agent/rules/no-scripts.md` | 重構安全性摘要 |
| `.agent/rules/runtime-data-validation.md` | 嚴格資料驗證 |
| `.agent/rules/typescript.md` | TypeScript 型別安全 |

---

## 相關文件

- [程式碼規範（英文）](./coding-standards.md)
- [程式碼規範（繁體中文）](./coding-standards.zh-tw.md)
- [GEMINI.md](../../GEMINI.md) — Gemini AI 指令
- [CLAUDE.md](../../CLAUDE.md) — Claude AI 指令
- [.github/copilot-instructions.md](../../.github/copilot-instructions.md) — Copilot 指令
