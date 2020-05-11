import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HbarCharCardComponent } from './hbar-char-card.component';

describe('HbarCharCardComponent', () => {
  let component: HbarCharCardComponent;
  let fixture: ComponentFixture<HbarCharCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HbarCharCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HbarCharCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
