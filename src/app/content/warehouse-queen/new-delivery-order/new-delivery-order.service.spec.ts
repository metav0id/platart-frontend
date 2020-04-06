import { TestBed } from '@angular/core/testing';

import { NewDeliveryOrderService } from './new-delivery-order.service';

describe('NewDeliveryOrderService', () => {
  let service: NewDeliveryOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewDeliveryOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
