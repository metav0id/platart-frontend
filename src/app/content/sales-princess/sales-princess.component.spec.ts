import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPrincessComponent } from './sales-princess.component';

describe('SalesPrincessComponent', () => {
  let component: SalesPrincessComponent;
  let fixture: ComponentFixture<SalesPrincessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesPrincessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesPrincessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
