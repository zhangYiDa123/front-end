import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealNamePage } from './real-name.page';

describe('RealNamePage', () => {
  let component: RealNamePage;
  let fixture: ComponentFixture<RealNamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealNamePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealNamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
