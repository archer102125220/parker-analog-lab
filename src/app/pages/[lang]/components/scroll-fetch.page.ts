import { Component, inject, signal, computed, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ScrollFetchComponent } from '@/app/components/ScrollFetch/scroll-fetch.component';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-scroll-fetch-demo-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    ScrollFetchComponent,
    TranslocoPipe
  ],
  styleUrls: ['./scroll-fetch.page.scss'],
  template: `
    <section class="scroll_fetch_page">
      <h1>{{ 'scrollFetch.title' | transloco }}</h1>
      <div class="scroll_fetch_page-description">
        <a rel="noopener" target="_blank" href="https://github.com/archer102125220/parker-analog-lab/blob/main/src/app/pages/components/scroll-fetch.page.ts">
          {{ 'scrollFetch.githubLink' | transloco }}
        </a>
      </div>

      <form class="scroll_fetch_page-form" (ngSubmit)="handleRefresh()">
        
        <mat-radio-group [(ngModel)]="userTokenType" name="tokenType">
          <mat-radio-button value="default">{{ 'scrollFetch.form.useDefaultToken' | transloco }}</mat-radio-button>
          <mat-radio-button value="input">
            <div class="scroll_fetch_page-form-token_option">
              <p class="scroll_fetch_page-form-token_option-label">{{ 'scrollFetch.form.inputTokenLabel' | transloco }}</p>
              <mat-form-field appearance="fill" class="scroll_fetch_page-form-token_option-token_input">
                <input matInput [(ngModel)]="userInputToken" name="inputToken" [disabled]="userTokenType !== 'input'" />
              </mat-form-field>
            </div>
          </mat-radio-button>
        </mat-radio-group>

        <mat-radio-group [(ngModel)]="userAccountType" name="accountType">
          <mat-radio-button value="default">{{ 'scrollFetch.form.useDefaultAccount' | transloco }}</mat-radio-button>
          <mat-radio-button value="input">
            <div class="scroll_fetch_page-form-account_option">
              <p class="scroll_fetch_page-form-account_option-label">{{ 'scrollFetch.form.inputAccountLabel' | transloco }}</p>
              <mat-form-field appearance="fill" class="scroll_fetch_page-form-account_option-account_input">
                <input matInput [(ngModel)]="userInputAccount" name="inputAccount" [disabled]="userAccountType !== 'input'" />
              </mat-form-field>
            </div>
          </mat-radio-button>
        </mat-radio-group>

        <button mat-raised-button color="primary" type="submit" [disabled]="isLoading()">{{ 'scrollFetch.form.reload' | transloco }}</button>
      </form>

      <app-scroll-fetch
        class="scroll_fetch_page-scroll_fetch"
        height="60vh"
        [loading]="isLoading()"
        [infinityEnd]="!hasNext()"
        [infinityBuffer]="300"
        [iosStyle]="false"
        [refreshDisable]="false"
        [isEmpty]="displayDataList().length === 0 && !isLoading()"
        [emptyLabel]="'scrollFetch.list.emptyLabel' | transloco"
        (onRefresh)="handleRefresh()"
        (onInfinityFetch)="handleInfinityFetch()"
      >
        <div class="scroll_fetch_page-scroll_fetch-content">
          <div *ngFor="let item of displayDataList(); let i = index" class="scroll_fetch_page-scroll_fetch-content-item">
            <p class="scroll_fetch_page-scroll_fetch-content-item-number">{{ 'scrollFetch.list.number' | transloco: { number: i + 1 } }}</p>
            <p class="scroll_fetch_page-scroll_fetch-content-item-name">{{ 'scrollFetch.list.repoName' | transloco: { name: item.name } }}</p>
            <p class="scroll_fetch_page-scroll_fetch-content-item-description">{{ 'scrollFetch.list.repoDesc' | transloco: { desc: item.description } }}</p>
            <div class="scroll_fetch_page-scroll_fetch-content-item-html_link">
              <p>{{ 'scrollFetch.list.repoLink' | transloco }}</p>
              <a class="scroll_fetch_page-scroll_fetch-content-item-html_link-repo_link" target="_blank" [href]="item.html_url">
                {{ item.html_url }}
              </a>
            </div>
          </div>
        </div>
      </app-scroll-fetch>
    </section>
  `
})
export default class ScrollFetchDemoPageComponent implements OnInit {
  private http = inject(HttpClient);

  // Form states
  userTokenType = 'default';
  userInputToken = '';
  userAccountType = 'default';
  userInputAccount = '';

  // Data states
  displayDataList = signal<any[]>([]);
  isLoading = signal<boolean>(false);
  hasNext = signal<boolean>(true);
  page = signal<number>(1);
  error = signal<any>(null);

  token = computed(() => this.userTokenType === 'default' ? import.meta.env['VITE_GITHUB_TOKEN'] || '' : this.userInputToken);
  account = computed(() => this.userAccountType === 'default' ? import.meta.env['VITE_GITHUB_ACCOUNT'] || '' : this.userInputAccount);

  ngOnInit() {
    this.fetchData();
  }

  handleRefresh() {
    if (this.isLoading()) return;
    this.displayDataList.set([]);
    this.page.set(1);
    this.hasNext.set(true);
    this.fetchData();
  }

  handleInfinityFetch() {
    if (this.isLoading() || !this.hasNext()) return;
    this.page.set(this.page() + 1);
    this.fetchData();
  }

  private fetchData() {
    const acc = this.account();
    const tkn = this.token();
    const p = this.page();

    if (!acc) return;

    this.isLoading.set(true);

    let headers = new HttpHeaders();
    if (tkn) {
      headers = headers.set('Authorization', `Bearer ${tkn}`);
    }

    this.http.get<any[]>(`https://api.github.com/users/${acc}/repos`, {
      headers,
      params: { per_page: '10', page: p.toString() },
      observe: 'response'
    }).subscribe({
      next: (response) => {
        const linkHeader = response.headers.get('link') || '';
        this.hasNext.set(linkHeader.includes('rel="next"'));
        
        if (response.body && Array.isArray(response.body)) {
           this.displayDataList.update(list => [...list, ...response.body!]);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('GitHub API error', err);
        this.error.set(err);
        this.hasNext.set(false);
        this.isLoading.set(false);
      }
    });
  }
}
