/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UyeCevaplarComponent } from './uye-cevaplar.component';

describe('UyeCevaplarComponent', () => {
  let component: UyeCevaplarComponent;
  let fixture: ComponentFixture<UyeCevaplarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UyeCevaplarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UyeCevaplarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
