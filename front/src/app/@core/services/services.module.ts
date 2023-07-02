import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AvatarRest } from './rest/avatar-rest.service';
import { UserRest } from './rest/user-rest.service';
import UserService from './user.service';

const SERVICES = [UserService, AvatarRest, UserRest];

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
