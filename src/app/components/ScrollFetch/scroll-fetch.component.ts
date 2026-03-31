import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  signal,
  computed,
  effect,
  AfterViewInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

const MOVE_DISTANCE_LIMIT = 50;

@Component({
  selector: 'app-scroll-fetch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-fetch.component.html',
  styleUrls: ['./scroll-fetch.component.scss'],
})
export class ScrollFetchComponent implements AfterViewInit, OnDestroy {
  @Input() pullLabel = '下拉即可重整...';
  @Input() pullingLabel = '釋放即可重整...';
  @Input() loadingLabel = '加載中...';
  @Input() refreshIcon?: string;
  @Input() refreshingIcon?: string;
  @Input() refreshDisable = true;
  @Input() set loading(val: boolean) {
    this._loading = val;
    // Auto-stop refresh animation when loading becomes false
    if (!val) {
      this.duration.set(500); // 設置 500ms 過度動畫時間
      // 立即將 distance 歸零，觸發 CSS 轉場動畫
      this.moveDistance.set(0);
      this.refreshIconRotate.set(0);

      setTimeout(() => {
        this.isShowRefreshIcon.set(false);
        this.isPulling.set(false);
        this.refreshing.set(false);
      }, 500);
    }
  }
  get loading(): boolean { return this._loading; }
  private _loading = false;
  @Input() iosStyle = false;
  @Input() iosTypeIconSize: string | number = 10;
  @Input() iosTypeIconStrokeWidth: string | number = 2;
  @Input() isEmpty = false;
  @Input() emptyLabel = '暂无资料';
  @Input() useObserver = true;
  @Input() infinityLabel = '拉至底部可繼續加載';
  @Input() infinityEndLabel = '沒有更多資料了';
  @Input() infinityBuffer = 100;
  @Input() infinityDisable = false;
  @Input() infinityEnd = true;
  @Input() height?: string | number;
  @Input() containerHeight?: string | number;

  @Output() onRefresh = new EventEmitter<void>();
  @Output() onInfinityFetch = new EventEmitter<void>();

  @ViewChild('scrollFetchRef') scrollFetchRef!: ElementRef<HTMLDivElement>;
  @ViewChild('infinityTriggerRef') infinityTriggerRef!: ElementRef<HTMLDivElement>;

  // Refresh State
  isPullStart = signal(false);
  isShowRefreshIcon = signal(false);
  moveDistance = signal(0);
  duration = signal(0);
  refreshing = signal(false);
  isPulling = signal(false);
  refreshIconAnimation = signal(false);
  refreshTriggerZIndex = signal(-1);
  refreshIconRotate = signal(0);

  // Infinity State
  infinityLoading = signal(false);
  infinityTrigger = signal(false);

  private observer: IntersectionObserver | null = null;
  private startY = 0;
  private isBrowser: boolean;
  private infinityTimeoutTimer: any;

  // Computed Values
  cssVariables = computed(() => {
    const md = this.moveDistance();
    const dur = this.duration();
    const rotate = this.refreshIconRotate();
    const isIos = this.iosStyle;

    const vars: any = {
      '--refresh_transition': `${dur}ms`,
      '--refresh_trigger_z_index': this.refreshTriggerZIndex(),
    };

    if (this.height) vars['--refresh_height'] = typeof this.height === 'number' ? `${this.height}px` : this.height;
    if (this.containerHeight) vars['--refresh_container_height'] = typeof this.containerHeight === 'number' ? `${this.containerHeight}px` : this.containerHeight;

    if (isIos) {
      vars['--refresh_icon_transform'] = `translate3d(0, 0, 0)`;
      vars['--refresh_transform'] = `translate3d(0, ${md}px, 0)`;
      vars['--refresh_ios_type_icon_size'] = typeof this.iosTypeIconSize === 'number' ? `${this.iosTypeIconSize}px` : this.iosTypeIconSize;
      vars['--refresh_ios_type_icon_stroke_width'] =  typeof this.iosTypeIconStrokeWidth === 'number' ? `${this.iosTypeIconStrokeWidth}px` : this.iosTypeIconStrokeWidth;
    } else {
      vars['--refresh_transform'] = 'translate3d(0, 0px, 0)';
      vars['--refresh_icon_transition'] = `${dur}ms`;
      vars['--refresh_icon_transform'] = `translate3d(0, ${md - 25}px, 0)`;
      vars['--refresh_icon_rotate'] = `rotate(${rotate}deg)`;
    }

    vars['--refresh_overflow'] = md > 0 ? 'hidden' : 'auto';
    return vars;
  });

  computedRefreshIcon = computed(() => {
    return (this.refreshing() && !this.isPullStart() ? this.refreshingIcon : this.refreshIcon) || this.refreshIcon || '';
  });

  hasRefreshIcon = computed(() => !!this.refreshIcon);
  showMainAnimation = computed(() => this.refreshing() && !this.isPullStart());

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);


    // Handle Infinity Trigger event
    effect(() => {
      if (this.infinityTrigger()) {
        this.handleInfinityTriggerLogic();
      }
    });

    // Lock page during pull-to-refresh
    effect(() => {
      if (!this.isBrowser) return;
      if (this.moveDistance() > 0) {
        document.documentElement.classList.add('scroll_fetching');
        document.body.style.overflow = 'hidden';
        document.body.style.overscrollBehaviorY = 'none';
      } else {
        document.documentElement.classList.remove('scroll_fetching');
        document.body.style.overflow = '';
        document.body.style.overscrollBehaviorY = '';
      }
    });
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;
    if (this.useObserver) {
      this.createObserver();
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private createObserver() {
    if (!this.infinityTriggerRef?.nativeElement) return;
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.infinityTrigger.set(true);
        }
      },
      { rootMargin: `0px 0px ${this.infinityBuffer}px 0px` }
    );
    this.observer.observe(this.infinityTriggerRef.nativeElement);
  }

  private async handleInfinityTriggerLogic() {
    if (this.infinityLoading()) return;

    if (!this.infinityDisable && !this.infinityEnd) {
      this.infinityLoading.set(true);
      try {
        this.onInfinityFetch.emit();
        // Fallback fake delay, we expect consumer to toggle `loading` logic or data to be updated
        await new Promise(res => setTimeout(res, 500));
      } finally {
        this.infinityLoading.set(false);
      }
    }
    
    // reset trigger so it can fire again
    requestAnimationFrame(() => this.infinityTrigger.set(false));
  }

  // --- Touch & Mouse Events ---
  
  handlePullStart(e: TouchEvent | MouseEvent) {
    if (this.refreshDisable || this.infinityLoading() || this.refreshing()) return;

    const scrollTop = this.scrollFetchRef?.nativeElement?.scrollTop || 0;
    if (scrollTop > 0) return;

    this.isPullStart.set(true);
    this.duration.set(0);
    this.moveDistance.set(0);
    this.refreshIconRotate.set(0);

    const touchEvent = e as TouchEvent;
    const mouseEvent = e as MouseEvent;

    this.startY =
      touchEvent.targetTouches?.[0]?.clientY ||
      mouseEvent.clientY ||
      0;
  }

  handlePulling(e: TouchEvent | MouseEvent) {
    if (this.refreshDisable || !this.isPullStart() || this.refreshing() || this.loading) return;

    const scrollTop = this.scrollFetchRef?.nativeElement?.scrollTop || 0;
    if (scrollTop > 0) return;

    const touchEvent = e as TouchEvent;
    const mouseEvent = e as MouseEvent;
    const currentY = touchEvent.targetTouches?.[0]?.clientY || mouseEvent.clientY || 0;
    
    const move = currentY - this.startY;

    if (this.startY > 0 && move > 0) {
      this.isShowRefreshIcon.set(true);
      this.refreshTriggerZIndex.set(this.iosStyle ? 0 : 2);
      
      // Add friction
      const _moveDistance = Math.pow(move, 0.8);

      if (_moveDistance < MOVE_DISTANCE_LIMIT + 5) {
        this.moveDistance.set(_moveDistance);
        this.refreshIconRotate.set(_moveDistance * 5.5);
      }
      
      const pulling = _moveDistance > MOVE_DISTANCE_LIMIT;
      this.isPulling.set(pulling);
      if (!this.iosStyle) {
        this.refreshIconAnimation.set(pulling);
      }
    }
  }

  handlePullEnd() {
    if (!this.isPullStart()) return;

    this.isPullStart.set(false);
    this.duration.set(300);
    this.startY = 0;

    if (this.moveDistance() <= 6) {
      this.isShowRefreshIcon.set(false);
    }

    if (this.refreshDisable || this.refreshing() || this.infinityLoading()) {
      if (this.moveDistance() > 6) {
        requestAnimationFrame(() => {
          this.moveDistance.set(0);
          this.refreshIconRotate.set(0);
        });
      }
      return;
    }

    if (this.moveDistance() > MOVE_DISTANCE_LIMIT && this.isPulling()) {
      this.refreshing.set(true);
      this.isPulling.set(false);
      this.moveDistance.set(this.iosStyle ? 50 : this.moveDistance());
      this.onRefresh.emit();
    } else {
      this.moveDistance.set(0);
      this.refreshIconRotate.set(0);
    }
  }

  handleCheckScroll() {
    if (!this.scrollFetchRef?.nativeElement || this.useObserver) return;
    const el = this.scrollFetchRef.nativeElement;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - this.infinityBuffer) {
      this.infinityTrigger.set(true);
    }
  }

  handleScroll(e: Event) {
    this.handleCheckScroll();
  }
}
