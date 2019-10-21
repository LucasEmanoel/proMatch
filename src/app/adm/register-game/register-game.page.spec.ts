import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterGamePage } from './register-game.page';

describe('RegisterGamePage', () => {
  let component: RegisterGamePage;
  let fixture: ComponentFixture<RegisterGamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterGamePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
