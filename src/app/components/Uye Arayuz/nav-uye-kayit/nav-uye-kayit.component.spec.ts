/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavUyeKayitComponent } from './nav-uye-kayit.component';

describe('NavUyeKayitComponent', () => {
  let component: NavUyeKayitComponent;
  let fixture: ComponentFixture<NavUyeKayitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavUyeKayitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavUyeKayitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
