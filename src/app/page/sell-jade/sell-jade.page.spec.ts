import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellJadePage } from './sell-jade.page';

describe('SellJadePage', () => {
  let component: SellJadePage;
  let fixture: ComponentFixture<SellJadePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellJadePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellJadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
