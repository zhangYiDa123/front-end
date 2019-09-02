import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealNameResultPage } from './real-name-result.page';

describe('RealNameResultPage', () => {
  let component: RealNameResultPage;
  let fixture: ComponentFixture<RealNameResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealNameResultPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealNameResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
