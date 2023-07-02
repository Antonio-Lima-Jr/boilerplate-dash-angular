import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';

import { Router } from '@angular/router';
import { NbAuthResult, NbAuthService } from '@nebular/auth';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { UserData } from '../../../@core/data/user.data';
import { THEMES } from '../../../@core/data/utils.data';
import { LayoutService } from '../../../@core/utils';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;

  themes = THEMES;

  currentTheme = 'default';

  userMenu: NbMenuItem[] = [
    { title: 'Profile', icon: 'person-outline' },
    { title: 'Settings', icon: 'settings-2-outline' },
    { title: 'Log out', icon: 'log-out-outline' },
  ];

  MENU_PROFILE_ACTIONS: { [key: string]: () => void } = {
    'Log out': () => {
      this.logout();
    },
    Profile: () => {
      this.router.navigateByUrl('/dashboard/profile');
    },
    Settings: () => {
      this.router.navigateByUrl('/dashboard/settings');
    },
  };

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private authService: NbAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme) => {
        this.themeService.changeTheme(theme);
        this.currentTheme = theme;
      });

    const { xl } = this.breakpointService.getBreakpointsMap();

    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) =>
          (this.userPictureOnly = isLessThanXl)
      );

    this.menuService
      .onItemClick()
      .pipe(
        map(({ item: { title } }) => title),
        takeUntil(this.destroy$)
      )
      .subscribe((title) => {
        if (this.MENU_PROFILE_ACTIONS.hasOwnProperty(title)) {
          this.MENU_PROFILE_ACTIONS[title]();
        }
      });
  }

  logout() {
    this.authService
      .logout('email')
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: NbAuthResult) => {
        const redirect = result.getRedirect();
        if (redirect) {
          this.router.navigateByUrl(redirect);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.userService.updateThemeLocal(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
