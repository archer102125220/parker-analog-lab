import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ComponentItem {
  title: string;
  desc: string;
  icon: string;
  badge: 'native' | 'ui' | 'form' | 'layout';
  badgeLabel: string;
  link: string;
  category: string;
}

@Component({
  selector: 'app-components-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="components_page">
      <div class="components_page__glow"></div>

      <!-- Page Header -->
      <header class="components-header">
        <a class="components-header__breadcrumb" routerLink="/">
          <span class="components-header__breadcrumb-icon">←</span>
          返回首頁
        </a>
        <h1 class="components-header__title">自製組件</h1>
        <p class="components-header__subtitle">
          探索使用 Angular 17+ Signals 所打造的自製組件與第三方整合實作，涵蓋 UI、表單、佈局與原生 API 各類場景。
        </p>
        <div class="components-header__stats">
          <span class="components-header__stat">
            <span class="components-header__stat-dot"></span>
            共 {{ allComponents().length }} 個組件
          </span>
          <span class="components-header__stat">
            <span class="components-header__stat-dot"></span>
            {{ filteredComponents().length }} 個目前顯示
          </span>
        </div>
      </header>

      <!-- Filter Bar -->
      <div class="components-filter">
        <span class="components-filter__label">分類篩選：</span>
        <div class="components-filter__tags">
          @for (cat of categories(); track cat.value) {
            <button
              class="components-filter__tag"
              [attr.css-is-active]="activeCategory() === cat.value ? 'true' : null"
              (click)="setCategory(cat.value)"
            >
              {{ cat.label }}
            </button>
          }
        </div>
      </div>

      <!-- Component Grid -->
      @if (filteredComponents().length > 0) {
        <div class="components-grid">
          @for (item of filteredComponents(); track item.title) {
            <a class="component-card" [routerLink]="item.link">
              <div class="component-card__header">
                <div class="component-card__icon-wrapper">{{ item.icon }}</div>
                <div class="component-card__meta">
                  <h2 class="component-card__title">{{ item.title }}</h2>
                  <span class="component-card__badge component-card__badge--{{ item.badge }}">
                    {{ item.badgeLabel }}
                  </span>
                </div>
              </div>
              <p class="component-card__desc">{{ item.desc }}</p>
              <div class="component-card__footer">
                <span class="component-card__arrow">→</span>
              </div>
            </a>
          }
        </div>
      } @else {
        <div class="components-empty">
          <div class="components-empty__icon">🔍</div>
          <p class="components-empty__text">此分類暫無組件，請試試其他分類。</p>
        </div>
      }
    </div>
  `,
  styleUrl: './index.page.scss',
})
export class ComponentsPageComponent {
  readonly activeCategory = signal<string>('all');

  readonly categories = signal([
    { value: 'all', label: '全部' },
    { value: 'ui', label: 'UI 元件' },
    { value: 'form', label: '表單' },
    { value: 'layout', label: '佈局' },
    { value: 'native', label: '原生 API' },
  ]);

  readonly allComponents = signal<ComponentItem[]>([
    {
      title: 'Dialog Modal',
      desc: '支援動畫開關、鍵盤 Esc 關閉與背景遮罩的對話框組件，基於 Angular Signal 實作狀態管理。',
      icon: '🪟',
      badge: 'ui',
      badgeLabel: 'UI 元件',
      link: '/components/dialog-modal',
      category: 'ui',
    },
    {
      title: 'Toast 通知',
      desc: '堆疊式通知提示組件，支援 success / error / warning / info 四種類型與自動消失計時。',
      icon: '🔔',
      badge: 'ui',
      badgeLabel: 'UI 元件',
      link: '/components/toast',
      category: 'ui',
    },
    {
      title: 'Dropdown Menu',
      desc: '可鍵盤操作的下拉選單，支援分組選項、圖示與禁用狀態，符合 ARIA 無障礙規範。',
      icon: '📋',
      badge: 'ui',
      badgeLabel: 'UI 元件',
      link: '/components/dropdown',
      category: 'ui',
    },
    {
      title: 'Image Upload',
      desc: '拖放上傳組件，整合預覽、進度條與檔案格式驗證，支援多檔案對列上傳。',
      icon: '🖼️',
      badge: 'form',
      badgeLabel: '表單',
      link: '/components/image-upload',
      category: 'form',
    },
    {
      title: 'Form Validator',
      desc: '基於 Angular Reactive Forms 的客製驗證器集合，包含 email、身份證字號、手機號碼等台灣常用格式。',
      icon: '✅',
      badge: 'form',
      badgeLabel: '表單',
      link: '/components/form-validator',
      category: 'form',
    },
    {
      title: 'ScrollFetch',
      desc: '支援「下拉更新 (Pull-to-refresh)」與「底部無限加載 (Infinite Scroll)」的高整合型組件。',
      icon: '🔄',
      badge: 'ui',
      badgeLabel: 'UI 元件',
      link: '/components/scroll-fetch',
      category: 'ui',
    },
    {
      title: 'Resizable Panel',
      desc: '可拖曳調整大小的分割面板組件，適用於程式碼編輯器、檔案管理器等雙側版面。',
      icon: '↔️',
      badge: 'layout',
      badgeLabel: '佈局',
      link: '/components/resizable-panel',
      category: 'layout',
    },
    {
      title: 'Clipboard Copy',
      desc: '整合 Clipboard API 的一鍵複製組件，帶複製成功動畫回饋，支援降級處理。',
      icon: '📋',
      badge: 'native',
      badgeLabel: '原生 API',
      link: '/components/clipboard',
      category: 'native',
    },
    {
      title: 'Geolocation',
      desc: '基於 Geolocation API 的定位組件，整合反向地理編碼並顯示使用者所在地資訊。',
      icon: '📍',
      badge: 'native',
      badgeLabel: '原生 API',
      link: '/components/geolocation',
      category: 'native',
    },
  ]);

  readonly filteredComponents = computed(() => {
    const cat = this.activeCategory();
    if (cat === 'all') {
      return this.allComponents();
    }
    return this.allComponents().filter((c) => c.category === cat);
  });

  setCategory(value: string): void {
    this.activeCategory.set(value);
  }
}

export default ComponentsPageComponent;
