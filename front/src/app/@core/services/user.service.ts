import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
  localStorageStrategy,
  persistState,
} from '@ngneat/elf-persist-state';
import { Avatar } from '../data/avatar.data';
import { ID, INITIAL_AUTH, User, UserData } from '../data/user.data';
import { AvatarRest } from './rest/avatar-rest.service';
import { UserRest } from './rest/user-rest.service';
import { ToastrService } from './toastr.service';

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
  email$ = userStore.pipe(select((state) => state.email));
  theme$ = userStore.pipe(select((state) => state.theme));
  avatar$ = userStore.pipe(select((state) => state.avatar));

  constructor(
    private userRest: UserRest,
    private avatarRest: AvatarRest,
    private toastService: ToastrService
  ) {
    super();
  }

  override getUserDbById(id: ID, params?: HttpParams): void {
    this.userRest.loadByID(id, params).subscribe({
      next: (userDb: Partial<User>) => {
        this.updateUserLocal({ ...userDb, id });
      },
    });
  }

  override updateAvatarDb(avatar: FormData): void {
    const id = userStore.getValue().id.toString();
    avatar.append('user', id);
    this.avatarRest.save(avatar).subscribe({
      next: (avatarDb: Partial<Avatar>) => {
        this.updateAvatarLocal(avatarDb);
      },
    });
  }

  override updateUserDb(user: User): void {
    user.id = userStore.getValue().id.toString();
    this.userRest
      .save(user).subscribe({
        next: (userDb: Partial<User>) => {
          this.updateUserLocal(userDb);
        },
        error: this.toastService.errorServidor,
        complete: () => this.toastService.success('Updated Profile'),
      });
  }

  override updateThemeLocal(theme: User['theme']): void {
    userStore.update((state) => ({
      ...state,
      theme,
    }));
  }

  override updateUserLocal(user: Partial<User>): void {
    userStore.update((state) => ({
      ...state,
      ...user,
    }));
  }
  override updateAvatarLocal(avatar: Partial<Avatar>): void {
    userStore.update((state) => ({
      ...state,
      avatar,
    }));
  }
}
