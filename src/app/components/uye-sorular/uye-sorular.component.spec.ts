/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UyeSorularComponent } from './uye-sorular.component';

describe('UyeSorularComponent', () => {
  let component: UyeSorularComponent;
  let fixture: ComponentFixture<UyeSorularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UyeSorularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UyeSorularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
