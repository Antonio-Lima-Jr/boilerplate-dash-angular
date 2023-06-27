import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { ID, User } from '../../../@core/data/user.data';
import UserService from '../../../@core/services/user.service';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(public userService: UserService) {}

  form: FormGroup;
  userId: ID;
  themes = THEMES;

  ngOnInit() {
    this.initForm();
    this.populateFields();
    this.onChangesForm();
  }

  private initForm() {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      fullName: new FormControl(''),
      picture: new FormControl(''),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      theme: new FormControl(''),
    });
  }

  private populateFields() {
    this.userService.userCurrent$.pipe(take(1)).subscribe({
      next: (user) => {
        this.userId = user.id;
        this.form.patchValue({
          username: user.username,
          fullName: user.fullName,
          picture: user.picture,
          email: user.email,
          theme: user.theme,
        });
      },
    });
  }

  private onChangesForm(): void {
    this.form.valueChanges.subscribe((val) => {
      this.userService.updateUserLocal(val);
    });
  }

  submitForm() {
    const { username, fullName, picture, email, theme } =
      this.form.value;
    const user: User = {
      id: this.userId,
      username: username,
      fullName: fullName,
      picture: picture,
      email: email,
      theme: theme,
    };
    this.userService.updateUser(user);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

const THEMES = [
  {
    value: 'default',
    name: 'Light',
  },
  {
    value: 'dark',
    name: 'Dark',
  },
  {
    value: 'cosmic',
    name: 'Cosmic',
  },
  {
    value: 'corporate',
    name: 'Corporate',
  },
];
