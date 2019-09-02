import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCardComponent } from './buy-card.component';

describe('BuyCardComponent', () => {
  let component: BuyCardComponent;
  let fixture: ComponentFixture<BuyCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
