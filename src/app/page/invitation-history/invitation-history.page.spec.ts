import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationHistoryPage } from './invitation-history.page';

describe('InvitationHistoryPage', () => {
  let component: InvitationHistoryPage;
  let fixture: ComponentFixture<InvitationHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationHistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
