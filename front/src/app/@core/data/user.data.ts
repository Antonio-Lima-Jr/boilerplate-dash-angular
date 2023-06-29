import { Observable } from 'rxjs';

export type ID = string | number | undefined;
export const INITIAL_AUTH: User = {
  id: '',
  username: '',
  picture: '',
  email: '',
  theme: 'default',
};

export interface User {
  id?: ID;
  username?: string;
  picture?: string;
  email?: string;
  theme?: string;
}

export abstract class UserData {
  abstract userCurrent$: Observable<User>;
  abstract id$: Observable<ID>;
  abstract username$: Observable<string>;
  abstract picture$: Observable<string>;
  abstract email$: Observable<string>;
  abstract theme$: Observable<string>;

  abstract updateTheme(auth: User['theme']): void;
  abstract updateUser(auth: User): void;
}
