import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDescriptionDetailsComponent } from './sales-description-details.component';

describe('SalesDescriptionDetailsComponent', () => {
  let component: SalesDescriptionDetailsComponent;
  let fixture: ComponentFixture<SalesDescriptionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesDescriptionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesDescriptionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
