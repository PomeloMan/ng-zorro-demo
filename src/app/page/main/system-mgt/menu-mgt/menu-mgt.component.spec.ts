import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMgtComponent } from './menu-mgt.component';

describe('MenuMgtComponent', () => {
  let component: MenuMgtComponent;
  let fixture: ComponentFixture<MenuMgtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuMgtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
