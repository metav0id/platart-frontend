import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerFormComponent } from './marker-form.component';

describe('MarkerFormComponent', () => {
  let component: MarkerFormComponent;
  let fixture: ComponentFixture<MarkerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
