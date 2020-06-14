import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MonthToDateTableCardComponent} from './month-to-date-table-card.component';

describe('MonthToDateTableCardComponent', () => {
  let component: MonthToDateTableCardComponent;
  let fixture: ComponentFixture<MonthToDateTableCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonthToDateTableCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthToDateTableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
