import { HttpClientModule } from '@angular/common/http';
import { DebugElement, InjectionToken } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { of } from 'rxjs';

import { CoreModule } from '../../../@core/core.module';
import UserService from '../../../@core/services/user.service';
import { ThemeModule } from '../../../@theme/theme.module';
import { AppRoutingModule } from '../../../app-routing.module';
import { Interceptor } from '../../../app.interceptor';
import { AppModule } from '../../../app.module';
import { PagesModule } from '../../pages.module';
import { DashboardModule } from './../dashboard.module';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let userServiceSpy: jasmine.SpyObj<UserService>

  beforeEach(async () => {

    const injectionToken = jasmine.createSpyObj('InjectionToken', [
      'get',
    ]);
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        AppModule,
        PagesModule,
        DashboardModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
        NbDatepickerModule.forRoot(),
        NbDialogModule.forRoot(),
        NbWindowModule.forRoot(),
        NbToastrModule.forRoot(),
        NbSpinnerModule,
        NbChatModule.forRoot({
          messageGoogleMapKey:
            '',
        }),
        CoreModule.forRoot(),
        ThemeModule.forRoot(),
        Interceptor,
        NbTabsetModule,
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: InjectionToken, useValue: injectionToken },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(
      UserService
    ) as jasmine.SpyObj<UserService>;
  });

  it('should create the component', () => {
    const dom = fixture.debugElement;
    const listInput = [
      'Username',
      'Full Name',
      'Picture',
      'Email',
      'Theme',
      'Save',
    ];
    const user = {
      id: '1',
      username: 'testuser',
      fullName: 'Test User',
      picture: 'test.jpg',
      email: 'test@example.com',
      theme: 'dark',
    };

    jasmine.createSpy('UserService', {
      userCurrent$: of(user),
    } as any);

    let formGroup = dom.queryAll(
      By.css('.form-group')
    ) as DebugElement[];

    formGroup.forEach((element, i) => {
      expect(
        element.nativeElement.textContent.includes(listInput[i])
      ).toBeTruthy();
    });
    expect(component).toBeTruthy();
    expect(formGroup.length).toBe(6);
  });
});
