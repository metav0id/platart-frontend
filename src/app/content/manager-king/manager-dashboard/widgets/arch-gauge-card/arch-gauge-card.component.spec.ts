import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ArchGaugeCardComponent} from './arch-gauge-card.component';

describe('ArchGaugeCardComponent', () => {
  let component: ArchGaugeCardComponent;
  let fixture: ComponentFixture<ArchGaugeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArchGaugeCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchGaugeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
