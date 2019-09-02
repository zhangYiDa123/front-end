import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsDetailsPage } from './goods-details.page';

describe('GoodsDetailsPage', () => {
  let component: GoodsDetailsPage;
  let fixture: ComponentFixture<GoodsDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
