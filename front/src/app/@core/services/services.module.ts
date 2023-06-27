import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import UserService from './user.service';

const SERVICES = [UserService];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [...SERVICES],
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders<ServicesModule> {
    return {
      ngModule: ServicesModule,
      providers: [...SERVICES],
    };
  }
}
