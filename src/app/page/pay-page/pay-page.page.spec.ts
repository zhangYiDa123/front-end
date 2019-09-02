import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayPagePage } from './pay-page.page';

describe('PayPagePage', () => {
  let component: PayPagePage;
  let fixture: ComponentFixture<PayPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
