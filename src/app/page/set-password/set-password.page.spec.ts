import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPasswordPage } from './set-password.page';

describe('SetPasswordPage', () => {
  let component: SetPasswordPage;
  let fixture: ComponentFixture<SetPasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetPasswordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
