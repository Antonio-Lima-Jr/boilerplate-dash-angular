import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserData } from '../../../@core/data/user.data';

import { OverviewComponent } from './overview.component';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  let userDataSpy: jasmine.SpyObj<UserData>;

  beforeEach(async () => {
    userDataSpy = jasmine.createSpyObj('UserData', ['updateTheme']);

    await TestBed.configureTestingModule({
      declarations: [ OverviewComponent ],
      providers: [
        { provide: UserData, useValue: userDataSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get theme from user data service', () => {
  });

  it('should update theme when user data service changes', () => {
    fixture.detectChanges();
  });
});
