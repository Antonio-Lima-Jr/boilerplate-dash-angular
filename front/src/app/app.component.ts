/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { NbThemeService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserData } from './@core/data/user.data';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private analytics: AnalyticsService,
    private seoService: SeoService,
    private userService: UserData,
    private themeService: NbThemeService,
    private authService: NbAuthService
  ) {}

  private destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
    this.userService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme) => {
        if (theme){
          this.themeService.changeTheme(theme);
        }
      });

    this.authService.onTokenChange().pipe(takeUntil(this.destroy$)).subscribe((token) => {
      if (token.isValid()) {
        this.userService.loadUser();
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
