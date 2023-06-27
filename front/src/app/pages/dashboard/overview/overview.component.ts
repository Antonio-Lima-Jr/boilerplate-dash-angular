import { Component } from '@angular/core';

import { UserData } from '../../../@core/data/user.data';

@Component({
  selector: 'ngx-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  constructor(private userService: UserData) {}

  theme$ = this.userService.theme$;
}
