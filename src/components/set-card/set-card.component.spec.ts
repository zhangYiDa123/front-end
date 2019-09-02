import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCardComponent } from './set-card.component';

describe('SetCardComponent', () => {
  let component: SetCardComponent;
  let fixture: ComponentFixture<SetCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
