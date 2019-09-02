import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyJadePage } from './my-jade.page';

describe('MyJadePage', () => {
  let component: MyJadePage;
  let fixture: ComponentFixture<MyJadePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyJadePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyJadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
