import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDeliveryFromWarehouseComponent } from './new-delivery-from-warehouse.component';

describe('NewDeliveryFromWarehouseComponent', () => {
  let component: NewDeliveryFromWarehouseComponent;
  let fixture: ComponentFixture<NewDeliveryFromWarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDeliveryFromWarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDeliveryFromWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
