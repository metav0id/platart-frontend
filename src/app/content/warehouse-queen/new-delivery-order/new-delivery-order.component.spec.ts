import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDeliveryOrderComponent } from './new-delivery-order.component';

describe('NewDeliveryOrderComponent', () => {
  let component: NewDeliveryOrderComponent;
  let fixture: ComponentFixture<NewDeliveryOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDeliveryOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDeliveryOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
