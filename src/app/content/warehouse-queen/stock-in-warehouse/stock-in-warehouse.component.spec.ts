import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockInWarehouseComponent } from './stock-in-warehouse.component';

describe('StockInWarehouseComponent', () => {
  let component: StockInWarehouseComponent;
  let fixture: ComponentFixture<StockInWarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockInWarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockInWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
