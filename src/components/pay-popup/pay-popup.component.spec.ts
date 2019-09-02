import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayPopupComponent } from './pay-popup.component';

describe('PayPopupComponent', () => {
  let component: PayPopupComponent;
  let fixture: ComponentFixture<PayPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayPopupComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
