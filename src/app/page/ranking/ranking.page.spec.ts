import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingPage } from './ranking.page';

describe('RankingPage', () => {
  let component: RankingPage;
  let fixture: ComponentFixture<RankingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
