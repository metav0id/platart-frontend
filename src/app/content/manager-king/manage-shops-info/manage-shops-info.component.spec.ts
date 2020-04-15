import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageShopsInfoComponent } from './manage-shops-info.component';

describe('ManageShopsInfoComponent', () => {
  let component: ManageShopsInfoComponent;
  let fixture: ComponentFixture<ManageShopsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageShopsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageShopsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
