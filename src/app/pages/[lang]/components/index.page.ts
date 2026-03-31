import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { toSignal } from '@angular/core/rxjs-interop';

interface ComponentItem {
  id: string;
  icon: string;
  badge: 'native' | 'ui' | 'form' | 'layout';
  link: string;
  category: string;
}

@Component({
  selector: 'app-components-page',
  standalone: true,
  imports: [RouterLink, TranslocoPipe],
  template: `
    <div class="components_page">
      <div class="components_page__glow"></div>

      <!-- Page Header -->
      <header class="components-header">
        <a class="components-header__breadcrumb" [routerLink]="['/', lang()]">
          <span class="components-header__breadcrumb-icon">←</span>
          {{ 'componentsPage.header.breadcrumb' | transloco }}
        </a>
        <h1 class="components-header__title">{{ 'componentsPage.header.title' | transloco }}</h1>
        <p class="components-header__subtitle">
          {{ 'componentsPage.header.subtitle' | transloco }}
        </p>
        <div class="components-header__stats">
          <span class="components-header__stat">
            <span class="components-header__stat-dot"></span>
            {{ 'componentsPage.header.totalCount' | transloco: { count: allComponents().length } }}
          </span>
          <span class="components-header__stat">
            <span class="components-header__stat-dot"></span>
            {{ 'componentsPage.header.showingCount' | transloco: { count: filteredComponents().length } }}
          </span>
        </div>
      </header>

      <!-- Filter Bar -->
      <div class="components-filter">
        <span class="components-filter__label">{{ 'componentsPage.filter.label' | transloco }}</span>
        <div class="components-filter__tags">
          @for (cat of categories(); track cat.value) {
            <button
              class="components-filter__tag"
              [attr.css-is-active]="activeCategory() === cat.value ? 'true' : null"
              (click)="setCategory(cat.value)"
            >
              {{ cat.labelKey | transloco }}
            </button>
          }
        </div>
      </div>

      <!-- Component Grid -->
      @if (filteredComponents().length > 0) {
        <div class="components-grid">
          @for (item of filteredComponents(); track item.link) {
            <a class="component-card" [routerLink]="'/' + lang() + item.link">
              <div class="component-card__header">
                <div class="component-card__icon-wrapper">{{ item.icon }}</div>
                <div class="component-card__meta">
                  <h2 class="component-card__title">{{ 'componentsPage.items.' + item.id + '.title' | transloco }}</h2>
                  <span class="component-card__badge component-card__badge--{{ item.badge }}">
                    {{ 'componentsPage.categories.' + item.category | transloco }}
                  </span>
                </div>
              </div>
              <p class="component-card__desc">{{ 'componentsPage.items.' + item.id + '.desc' | transloco }}</p>
              <div class="component-card__footer">
                <span class="component-card__arrow">→</span>
              </div>
            </a>
          }
        </div>
      } @else {
        <div class="components-empty">
          <div class="components-empty__icon">🔍</div>
          <p class="components-empty__text">{{ 'componentsPage.filter.empty' | transloco }}</p>
        </div>
      }
    </div>
  `,
  styleUrl: './index.page.scss',
})
export class ComponentsPageComponent {
  private readonly transloco = inject(TranslocoService);
  readonly lang = toSignal(this.transloco.langChanges$, { initialValue: this.transloco.getActiveLang() });

  readonly activeCategory = signal<string>('all');

  readonly categories = signal([
    { value: 'all', labelKey: 'componentsPage.categories.all' },
    { value: 'ui', labelKey: 'componentsPage.categories.ui' },
    { value: 'form', labelKey: 'componentsPage.categories.form' },
    { value: 'layout', labelKey: 'componentsPage.categories.layout' },
    { value: 'native', labelKey: 'componentsPage.categories.native' },
  ]);

  readonly allComponents = signal<ComponentItem[]>([
    {
      id: 'dialogModal',
      icon: '🪟',
      badge: 'ui',
      link: '/components/dialog-modal',
      category: 'ui',
    },
    {
      id: 'toast',
      icon: '🔔',
      badge: 'ui',
      link: '/components/toast',
      category: 'ui',
    },
    {
      id: 'dropdown',
      icon: '📋',
      badge: 'ui',
      link: '/components/dropdown',
      category: 'ui',
    },
    {
      id: 'imageUpload',
      icon: '🖼️',
      badge: 'form',
      link: '/components/image-upload',
      category: 'form',
    },
    {
      id: 'formValidator',
      icon: '✅',
      badge: 'form',
      link: '/components/form-validator',
      category: 'form',
    },
    {
      id: 'scrollFetch',
      icon: '🔄',
      badge: 'ui',
      link: '/components/scroll-fetch',
      category: 'ui',
    },
    {
      id: 'resizablePanel',
      icon: '↔️',
      badge: 'layout',
      link: '/components/resizable-panel',
      category: 'layout',
    },
    {
      id: 'clipboardCopy',
      icon: '📋',
      badge: 'native',
      link: '/components/clipboard',
      category: 'native',
    },
    {
      id: 'geolocation',
      icon: '📍',
      badge: 'native',
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
