import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntvG2Component } from './antv-g2.component';

describe('AntvG2Component', () => {
  let component: AntvG2Component;
  let fixture: ComponentFixture<AntvG2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntvG2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntvG2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
