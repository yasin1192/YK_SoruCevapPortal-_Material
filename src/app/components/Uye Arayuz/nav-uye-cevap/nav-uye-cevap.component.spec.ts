/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavUyeCevapComponent } from './nav-uye-cevap.component';

describe('NavUyeCevapComponent', () => {
  let component: NavUyeCevapComponent;
  let fixture: ComponentFixture<NavUyeCevapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavUyeCevapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavUyeCevapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
