import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { User } from '../../../@core/data/user.data';
import { THEMES } from '../../../@core/data/utils.data';
import UserService from '../../../@core/services/user.service';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private userService: UserService) {}

  form: FormGroup;
  avatar: FileList = null;
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
      next: (user: User) => {
        this.form.patchValue({
          username: user.username,
          email: user.email,
          theme: user.theme,
        });
      },
    });
  }

  private onChangesForm(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        this.userService.updateUserLocal(val);
      });
  }

  toFormData(): FormData {
    const formDataAvatar = new FormData();
    formDataAvatar.append('name', 'Avatar');
    formDataAvatar.append('image', this.avatar[0]);
    return formDataAvatar;
  }

  submitForm() {
    if (this.form.valid) {
      const { username, email } = this.form.value;
      const user: User = {
        username: username,
        email: email,
      };
      if (this.avatar) {
        this.userService.updateAvatarDb(this.toFormData());
      }
      this.userService.updateUserDb(user);
    }
  }
  changeImage($event: any) {
    let target = $event.target || $event.srcElement;
    this.avatar = target.files;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}