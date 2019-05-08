import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMgtComponent } from './role-mgt.component';

describe('RoleMgtComponent', () => {
  let component: RoleMgtComponent;
  let fixture: ComponentFixture<RoleMgtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleMgtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
