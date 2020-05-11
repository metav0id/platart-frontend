import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VbarChartCardComponent } from './vbar-chart-card.component';

describe('VbarChartCardComponent', () => {
  let component: VbarChartCardComponent;
  let fixture: ComponentFixture<VbarChartCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VbarChartCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VbarChartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
