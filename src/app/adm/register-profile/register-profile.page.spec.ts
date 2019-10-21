import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProfilePage } from './register-profile.page';

describe('RegisterProfilePage', () => {
  let component: RegisterProfilePage;
  let fixture: ComponentFixture<RegisterProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
