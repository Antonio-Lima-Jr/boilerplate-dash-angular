import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from '../../data/user.data';
import { CrudService } from './crud.service';

@Injectable()
export class UserRest extends CrudService<Partial<User>> {
  constructor(protected http: HttpClient) {
    super(http, `${environment.API}users/`);
  }
}
