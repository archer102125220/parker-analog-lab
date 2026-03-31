import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not_found_page">
      <div class="not_found_page__glow"></div>
      
      <div class="not_found_page__content">
        <h1 class="not_found_page__title">{{ errorCode() }}</h1>
        <h2 class="not_found_page__subtitle">{{ title() }}</h2>
        <p class="not_found_page__desc">{{ description() }}</p>

        <a class="not_found_page__btn" routerLink="/">
          返回首頁
          <span class="not_found_page__btn-icon">→</span>
        </a>
      </div>
    </div>
  `,
  styles: `
    .not_found_page {
      padding: 60px 24px;
      margin: 0 auto;
      min-height: calc(100vh - 64px - 100px);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.8s ease-out;
      position: relative;
    }

    .not_found_page__glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100vw;
      height: 100vw;
      max-width: 800px;
      max-height: 800px;
      background: radial-gradient(circle, rgba(221, 0, 49, 0.04) 0%, rgba(248, 250, 252, 0) 65%);
      z-index: -1;
      pointer-events: none;
    }

    .not_found_page__content {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .not_found_page__title {
      font-size: 8rem;
      font-weight: 900;
      margin: 0 0 16px 0;
      background: linear-gradient(135deg, #0f172a 0%, #475569 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -0.04em;
      line-height: 1;
    }

    .not_found_page__subtitle {
      font-size: 2rem;
      font-weight: 700;
      color: var(--app-text-color);
      margin: 0 0 16px 0;
      letter-spacing: -0.02em;
    }

    .not_found_page__desc {
      font-size: 1.125rem;
      color: var(--app-text-muted);
      line-height: 1.6;
      max-width: 500px;
      margin: 0 0 40px 0;
    }

    .not_found_page__btn {
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
      background-color: var(--app-primary-color);
      color: #ffffff;
      border: 1px solid var(--app-primary-color);
      box-shadow: 0 8px 16px rgba(221, 0, 49, 0.2);

      &:hover {
        background-color: var(--app-primary-hover);
        border-color: var(--app-primary-hover);
        transform: translateY(-2px);
        box-shadow: 0 12px 20px rgba(221, 0, 49, 0.3);

        .not_found_page__btn-icon {
          transform: translateX(4px);
        }
      }
    }

    .not_found_page__btn-icon {
      margin-left: 8px;
      transition: transform 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Responsive Adjustments */
    @media (max-width: 768px) {
      .not_found_page__title {
        font-size: 6rem;
      }
      .not_found_page__subtitle {
        font-size: 1.5rem;
      }
      .not_found_page__desc {
        font-size: 1rem;
      }
    }
  `
})
export class NotFoundPageComponent {
  errorCode = signal('404');
  title = signal('找不到這個頁面');
  description = signal('抱歉，您嘗試訪問的頁面可能已被移除、重新命名或暫時無法使用。');
}

export default NotFoundPageComponent;
