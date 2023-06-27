import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NbAuthResult, NbAuthService } from "@nebular/auth";
import {
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from "@nebular/theme";
import { Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";

import { UserData } from "../../../@core/data/user.data";
import { LayoutService } from "../../../@core/utils";

@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;

  userMenu: NbMenuItem[] = [
    { title: "Profile", icon: "person-outline" },
    { title: "Settings", icon: "settings-2-outline" },
    { title: "Log out", icon: "log-out-outline" },
  ];

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
    const { xl } = this.breakpointService.getBreakpointsMap();

    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );

    const MENU_PROFILE_ACTIONS: { [key: string]: () => void } = {
      "Log out": () => this.logout(),
      Profile: () => this.router.navigateByUrl("/dashboard/profile"),
      Settings: () => this.router.navigateByUrl("/dashboard/settings"),
    };

    this.menuService
      .onItemClick()
      .pipe(map(({ item: { title } }) => title))
      .subscribe((title) => {
        if (MENU_PROFILE_ACTIONS.hasOwnProperty(title)) {
          MENU_PROFILE_ACTIONS[title]();
        }
      });
  }

  logout() {
    this.authService
      .logout("email")
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: NbAuthResult) => {
        const redirect = result.getRedirect();
        if (redirect) {
          return this.router.navigateByUrl(redirect);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
