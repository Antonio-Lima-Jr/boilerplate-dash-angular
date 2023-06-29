import { Injectable } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
  localStorageStrategy,
  persistState,
} from '@ngneat/elf-persist-state';
import { INITIAL_AUTH, User, UserData } from '../data/user.data';

const userStore = createStore(
  { name: 'user' },
  withProps<User>(INITIAL_AUTH)
);

const persisted = persistState(userStore, {
  key: 'user',
  storage: localStorageStrategy,
});

@Injectable()
export default class UserService extends UserData {
  userCurrent$ = userStore.pipe(select((state) => state));
  id$ = userStore.pipe(select((state) => state.id));
  username$ = userStore.pipe(select((state) => state.username));
  picture$ = userStore.pipe(select((state) => state.picture));
  email$ = userStore.pipe(select((state) => state.email));
  theme$ = userStore.pipe(select((state) => state.theme));

  updateUser(user: User): void {
    userStore.update((state) => ({
      ...state,
      ...user,
    }));
  }

  updateTheme(theme: User['theme']) {
    userStore.update((state) => ({
      ...state,
      theme,
    }));
  }
}
