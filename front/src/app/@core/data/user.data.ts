import { Observable } from 'rxjs';

export type ID = string | number | undefined;

export const INITIAL_AUTH: User = {
  theme: 'default',
};

export interface User {
  id?: ID;
  username?: string;
  fullName?: string;
  picture?: string;
  email?: string;
  roles?: string[];
  theme?: string;
}
export abstract class UserData {
  abstract userCurrent$: Observable<User>;
  abstract id$: Observable<ID>;
  abstract username$: Observable<string>;
  abstract picture$: Observable<string>;
  abstract email$: Observable<string>;
  abstract theme$: Observable<string>;

  abstract updateUser(auth: User): void;
  abstract loadUser(): void;
}
