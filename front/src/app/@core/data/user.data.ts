import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Avatar } from './avatar.data';

export type ID = string | number | undefined;

export interface User {
  id?: ID;
  username?: string;
  email?: string;
  theme?: string;
  avatar?: Avatar;
}

export const INITIAL_AUTH: User = {
  id: '',
  username: '',
  email: '',
  theme: 'default',
  avatar: {}
};

export abstract class UserData {
  abstract userCurrent$: Observable<User>;
  abstract id$: Observable<ID>;
  abstract username$: Observable<string>;
  abstract email$: Observable<string>;
  abstract theme$: Observable<string>;
  abstract avatar$: Observable<Avatar>

  abstract getUserDbById(id: ID, params?: HttpParams): void;
  abstract updateAvatarDb(avatar: FormData): void;
  abstract updateUserDb(user: User): void;
  abstract updateThemeLocal(auth: User['theme']): void;
  abstract updateUserLocal(user: Partial<User>): void;
  abstract updateAvatarLocal(avatar: Partial<Avatar>): void
}
