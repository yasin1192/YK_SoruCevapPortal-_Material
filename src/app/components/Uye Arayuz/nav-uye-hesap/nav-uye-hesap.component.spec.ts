/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavUyeHesapComponent } from './nav-uye-hesap.component';

describe('NavUyeHesapComponent', () => {
  let component: NavUyeHesapComponent;
  let fixture: ComponentFixture<NavUyeHesapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavUyeHesapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavUyeHesapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
