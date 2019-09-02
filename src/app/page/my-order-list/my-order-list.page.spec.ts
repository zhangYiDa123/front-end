import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrderListPage } from './my-order-list.page';

describe('MyOrderListPage', () => {
  let component: MyOrderListPage;
  let fixture: ComponentFixture<MyOrderListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOrderListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrderListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
