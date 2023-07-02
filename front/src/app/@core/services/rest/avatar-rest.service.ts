import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Avatar } from '../../data/avatar.data';
import { CrudService } from './crud.service';

@Injectable()
export class AvatarRest extends CrudService<
  Partial<Avatar | FormData>
> {
  constructor(protected http: HttpClient) {
    super(http, `${environment.API}avatars/`);
  }
}
