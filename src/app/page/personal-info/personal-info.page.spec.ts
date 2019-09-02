import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfoPage } from './personal-info.page';

describe('PersonalInfoPage', () => {
  let component: PersonalInfoPage;
  let fixture: ComponentFixture<PersonalInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
