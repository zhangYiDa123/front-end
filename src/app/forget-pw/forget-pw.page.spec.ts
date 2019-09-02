import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPWPage } from './forget-pw.page';

describe('ForgetPWPage', () => {
  let component: ForgetPWPage;
  let fixture: ComponentFixture<ForgetPWPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetPWPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPWPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
