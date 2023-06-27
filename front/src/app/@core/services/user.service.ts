import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { createStore, select, withProps } from '@ngneat/elf';
import {
  localStorageStrategy,
  persistState,
} from '@ngneat/elf-persist-state';
import { take } from 'rxjs/operators';

import { User, UserData } from '../data/user.data';

const authStore = createStore({ name: 'auth' }, withProps<User>({}));

const persisted = persistState(authStore, {
  key: 'auth',
  storage: localStorageStrategy,
});

@Injectable()
export default class UserService extends UserData {
  constructor(
    private http: HttpClient,
    private authService: NbAuthService
  ) {
    super();
    this.initToken();
  }

  token: string | null = null;

  userCurrent$ = authStore.pipe(select((state) => state));
  id$ = authStore.pipe(select((state) => state.id));
  username$ = authStore.pipe(select((state) => state.username));
  picture$ = authStore.pipe(select((state) => state.picture));
  email$ = authStore.pipe(select((state) => state.email));
  theme$ = authStore.pipe(select((state) => state.theme));

  private initToken() {
    this.authService.onTokenChange().subscribe((token) => {
      this.token = token.getValue();
    });
  }

  async updateUser(user: User): Promise<void> {
    this.http
      .post('/api/v1/user/update', { ...user }, {})
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          authStore.update((state) => ({
            ...state,
            ...user,
          }));
        },
        complete: () => {
          this.authService
            .refreshToken('email', { token: this.token })
            .pipe(take(1))
            .subscribe();
        },
      });
  }

  loadUser() {
    this.authService
      .getToken()
      // .pipe(take(1))
      .subscribe((token) => {
        const user: User = {
          id: token.getPayload().sub,
          email: token.getPayload().email,
          username: token.getPayload().username,
          roles: token.getPayload().roles,
          picture: token.getPayload().picture,
          theme: token.getPayload().theme,
          fullName: token.getPayload().fullName,
        };
        authStore.update((state) => ({
          ...state,
          ...user,
        }));
      });
  }

  updateUserLocal(user: User) {
    const { email, username, picture, fullName, theme } = user;
    authStore.update((state) => ({
      ...state,
      email,
      username,
      picture,
      fullName,
      theme,
    }));
  }
}
