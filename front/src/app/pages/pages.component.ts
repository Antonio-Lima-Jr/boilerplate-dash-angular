import { Component, OnDestroy, OnInit } from '@angular/core';

import { HttpParams } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import UserService from '../@core/services/user.service';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  menu = MENU_ITEMS;
  constructor(
    private authService: NbAuthService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.authService
      .onTokenChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (token) => {
          const params = new HttpParams({
            fromObject: {
              expand: 'avatar',
              omit: 'content',
            },
          });

          this.userService.getUserDbById(
            token.getPayload()['user_id'],
            params
          );
        },
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
