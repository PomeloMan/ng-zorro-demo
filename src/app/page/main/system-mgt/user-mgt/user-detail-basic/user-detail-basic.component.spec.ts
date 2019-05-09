import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailBasicComponent } from './user-detail-basic.component';

describe('UserDetailBasicComponent', () => {
  let component: UserDetailBasicComponent;
  let fixture: ComponentFixture<UserDetailBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
