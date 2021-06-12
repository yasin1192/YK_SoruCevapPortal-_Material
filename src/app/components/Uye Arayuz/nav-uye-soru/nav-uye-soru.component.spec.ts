/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavUyeSoruComponent } from './nav-uye-soru.component';

describe('NavUyeSoruComponent', () => {
  let component: NavUyeSoruComponent;
  let fixture: ComponentFixture<NavUyeSoruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavUyeSoruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavUyeSoruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
