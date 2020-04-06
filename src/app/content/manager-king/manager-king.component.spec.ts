import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerKingComponent } from './manager-king.component';

describe('ManagerQueenComponent', () => {
  let component: ManagerKingComponent;
  let fixture: ComponentFixture<ManagerKingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerKingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerKingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
