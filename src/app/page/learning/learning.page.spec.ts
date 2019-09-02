import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningPage } from './learning.page';

describe('LearningPage', () => {
  let component: LearningPage;
  let fixture: ComponentFixture<LearningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
