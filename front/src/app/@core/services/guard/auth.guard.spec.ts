import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { of } from 'rxjs';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<NbAuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('NbAuthService', ['isAuthenticated']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: NbAuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if user is authenticated', (done) => {
    authServiceSpy.isAuthenticated.and.returnValue(of(true));

    guard.canActivate().subscribe((result) => {
      expect(result).toBeTruthy();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('should redirect to login if user is not authenticated', (done) => {
    authServiceSpy.isAuthenticated.and.returnValue(of(false));

    guard.canActivate().subscribe((result) => {
      expect(result).toBeFalsy();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['auth/login']);
      done();
    });
  });
});
