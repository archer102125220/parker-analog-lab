/**
 * 💡 示意單一檔案元件 (Single-File Component) 寫法
 * 
 * 此首頁採用 Angular 17+ 的 Standalone Component 特性，
 * 將 Template、Styles (SCSS) 與 TypeScript (Signals 邏輯) 完全封裝在同一份檔案中。
 * 這是 Analog 專案中，不借助尾綴 .analog，一樣能達到高內聚力開發體驗的最佳實踐。
 */
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FeatureCard {
  title: string;
  desc: string;
  link: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="home_page">
      <div class="home_page__glow"></div>
      
      <section class="home-hero">
        <div class="home-hero__content">
          <div class="home-hero__pill">
            <span class="home-hero__pill-icon">✨</span> 
            <span>基於 Analog 2.x & Angular 17+ 打造</span>
          </div>

          <div class="home-hero__logo-wrapper">
            <img class="home-hero__logo" src="/img/logo/Analog.jsLab.v.09.webp" alt="Analog Logo" />
          </div>

          <h1 class="home-hero__title">{{ title() }}</h1>
          <h2 class="home-hero__subtitle">{{ subtitle() }}</h2>
          <p class="home-hero__desc">{{ description() }}</p>

          <div class="home-hero__actions">
            <a class="home-hero__btn home-hero__btn--primary" routerLink="/about">
              了解更多
              <span class="home-hero__btn-icon">→</span>
            </a>
            <a class="home-hero__btn home-hero__btn--outline" routerLink="/components">探索組件</a>
          </div>
        </div>
      </section>

      <section class="home-features">
        <div class="home-features__header">
          <h3 class="home-features__title">功能導覽</h3>
          <p class="home-features__desc">探索這個實驗室中所有酷炫的功能與技術實作</p>
        </div>
        
        <div class="home-features__grid">
          @for (feature of features(); track feature.title) {
            <a class="home-feature-card" [routerLink]="feature.link">
              <div class="home-feature-card__content">
                <h4 class="home-feature-card__title">{{ feature.title }}</h4>
                <p class="home-feature-card__desc">{{ feature.desc }}</p>
              </div>
              <div class="home-feature-card__footer">
                <span class="home-feature-card__arrow">→</span>
              </div>
            </a>
          }
        </div>
      </section>
    </div>
  `,
  styles: `
    .home_page {
      padding: 60px 24px 100px;
      max-width: 1140px;
      margin: 0 auto;
      min-height: calc(100vh - 64px - 100px);
      display: flex;
      flex-direction: column;
      gap: 100px;
      animation: fadeIn 0.8s ease-out;
      position: relative;
    }

    /* Subtle background glow effect using an explicit element */
    .home_page__glow {
      position: absolute;
      top: -15%;
      left: 50%;
      transform: translateX(-50%);
      width: 100vw;
      height: 100vw;
      max-width: 900px;
      max-height: 900px;
      background: radial-gradient(circle, rgba(221, 0, 49, 0.04) 0%, rgba(248, 250, 252, 0) 65%);
      z-index: -1;
      pointer-events: none;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .home-hero {
      text-align: center;
      margin-top: 40px;

      &__content {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      &__pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 16px;
        background: #ffffff;
        border: 1px solid var(--app-border-color);
        border-radius: 999px;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--app-text-muted);
        margin-bottom: 32px;
        box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
        transition: transform 0.2s ease;

        &:hover {
          transform: translateY(-2px);
          border-color: rgba(221, 0, 49, 0.2);
        }
      }

      &__logo-wrapper {
        width: 88px;
        height: 88px;
        background: #ffffff;
        border: 1px solid var(--app-border-color);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 24px;
        box-shadow: 0 12px 24px rgba(15, 23, 42, 0.05);
        animation: float 6s ease-in-out infinite;
      }

      &__logo {
        width: 54px;
        height: 54px;
      }

      &__title {
        font-size: 4.2rem;
        font-weight: 900;
        margin: 0 0 16px 0;
        background: linear-gradient(135deg, #0f172a 0%, #475569 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        letter-spacing: -0.04em;
        line-height: 1.1;
      }

      &__subtitle {
        font-size: 1.5rem;
        font-weight: 500;
        color: var(--app-primary-color);
        margin: 0 0 24px 0;
        letter-spacing: -0.01em;
      }

      &__desc {
        max-width: 640px;
        font-size: 1.125rem;
        color: var(--app-text-muted);
        line-height: 1.7;
        margin: 0 0 40px 0;
      }

      &__actions {
        display: flex;
        gap: 16px;
        margin-bottom: 20px;
      }

      &__btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 14px 32px;
        border-radius: 12px;
        font-weight: 600;
        font-size: 1rem;
        text-decoration: none;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;

        &-icon {
          margin-left: 8px;
          transition: transform 0.2s ease;
        }

        &--primary {
          background-color: var(--app-primary-color);
          color: #ffffff;
          border: 1px solid var(--app-primary-color);
          box-shadow: 0 8px 16px rgba(221, 0, 49, 0.2);

          &:hover {
            background-color: var(--app-primary-hover);
            border-color: var(--app-primary-hover);
            transform: translateY(-2px);
            box-shadow: 0 12px 20px rgba(221, 0, 49, 0.3);

            .home-hero__btn-icon {
              transform: translateX(4px);
            }
          }
        }

        &--outline {
          background-color: #ffffff;
          color: var(--app-text-color);
          border: 1px solid var(--app-border-color);
          box-shadow: 0 4px 6px rgba(15, 23, 42, 0.03);

          &:hover {
            border-color: var(--app-text-muted);
            transform: translateY(-2px);
            box-shadow: 0 8px 12px rgba(15, 23, 42, 0.06);
          }
        }
      }
    }

    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
      100% { transform: translateY(0px); }
    }

    .home-features {
      &__header {
        text-align: center;
        margin-bottom: 48px;
      }

      &__title {
        font-size: 2.25rem;
        font-weight: 800;
        margin: 0 0 12px 0;
        color: var(--app-text-color);
        letter-spacing: -0.02em;
      }

      &__desc {
        font-size: 1.125rem;
        color: var(--app-text-muted);
        margin: 0;
      }

      &__grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
      }
    }

    .home-feature-card {
      background: #ffffff;
      border: 1px solid var(--app-border-color);
      border-radius: 20px;
      padding: 32px 28px;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      height: 100%;
      position: relative;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.02);

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at right top, rgba(221, 0, 49, 0.04), transparent 50%);
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      &:hover {
        transform: translateY(-6px);
        border-color: rgba(221, 0, 49, 0.2);
        box-shadow: 0 20px 32px -12px rgba(15, 23, 42, 0.08);

        &::before {
          opacity: 1;
        }

        .home-feature-card__arrow {
          transform: translateX(6px) scale(1.1);
          color: var(--app-primary-color);
        }
      }

      &__content {
        flex: 1;
        position: relative;
        z-index: 1;
      }

      &__title {
        font-size: 1.35rem;
        font-weight: 700;
        color: var(--app-text-color);
        margin: 0 0 16px 0;
        letter-spacing: -0.01em;
      }

      &__desc {
        font-size: 0.95em;
        color: var(--app-text-muted);
        line-height: 1.6;
        margin: 0;
      }

      &__footer {
        margin-top: 24px;
        display: flex;
        justify-content: flex-end;
        position: relative;
        z-index: 1;
      }

      &__arrow {
        color: var(--app-text-muted);
        font-size: 1.25rem;
        font-weight: 600;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: inline-block;
      }
    }

    /* Responsive Adjustments */
    @media (max-width: 1024px) {
      .home-features__grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .home_page {
        padding: 40px 16px 80px;
        gap: 60px;
      }

      .home-hero {
        &__title {
          font-size: 3rem;
        }
        &__subtitle {
          font-size: 1.25rem;
        }
        &__actions {
          flex-direction: column;
          width: 100%;
          max-width: 320px;
        }
        &__btn {
          width: 100%;
        }
      }

      .home-features {
        &__title {
          font-size: 1.8rem;
        }
        &__grid {
          grid-template-columns: 1fr;
        }
      }
    }
  `
})
export class HomePageComponent {
  title = signal('Parker Analog Lab');
  subtitle = signal('探索 Angular 與 Analog 的無限可能');
  description = signal('一個以 Analog 2.x 為核心的實驗型專案，整合最新 Angular Signals，展示現代化前後端串接與 UI 實作。');

  features = signal<FeatureCard[]>([
    { title: 'Notion 筆記', desc: '日常工作與私下研究的 SEO 及技術實戰紀錄', link: '/notes' },
    { title: '關於本站', desc: '了解專案的技術架構、使用的技術棧和開發理念', link: '/about' },
    { title: '自製組件', desc: '探索自製組件和第三方整合組件的實作範例', link: '/components' },
    { title: '指令特效', desc: '查看自製 Directive 的實作和使用方式', link: '/directive-effects' },
    { title: '路由相關測試', desc: '測試 Analog 路由相關功能和特性', link: '/route' },
    { title: 'CSS 繪圖測試', desc: '使用 CSS 和動畫庫創作的視覺效果展示', link: '/css-drawing' },
    { title: '生物辨識 (原生)', desc: '原生 WebAuthn API 的生物辨識實作', link: '/web-authn' },
    { title: 'WebCam 測試', desc: 'WebCam 視訊串流的應用測試', link: '/web-cam' },
    { title: 'AI 整合', desc: '機器學習相關整合', link: '/face-swap' },
    { title: '即時通訊', desc: 'WebSocket 與 WebRTC 即時通訊測試', link: '/socket-test' }
  ]);
}

// Analog 檔案路由所需的預設匯出
export default HomePageComponent;

