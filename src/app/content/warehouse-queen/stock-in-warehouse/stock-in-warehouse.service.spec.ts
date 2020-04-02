import { TestBed } from '@angular/core/testing';

import { StockInWarehouseService } from './stock-in-warehouse.service';

describe('StockInWarehouseService', () => {
  let service: StockInWarehouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockInWarehouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
