import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedupPage } from './speedup.page';

describe('SpeedupPage', () => {
  let component: SpeedupPage;
  let fixture: ComponentFixture<SpeedupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
