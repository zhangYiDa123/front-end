import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressListPage } from './address-list.page';

describe('AddressListPage', () => {
  let component: AddressListPage;
  let fixture: ComponentFixture<AddressListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
