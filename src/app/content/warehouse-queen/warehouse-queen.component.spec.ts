import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseQueenComponent } from './warehouse-queen.component';

describe('WarehouseQueenComponent', () => {
  let component: WarehouseQueenComponent;
  let fixture: ComponentFixture<WarehouseQueenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseQueenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseQueenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
