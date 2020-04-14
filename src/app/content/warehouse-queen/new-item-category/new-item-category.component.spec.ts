import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewItemCategoryComponent } from './new-item-category.component';

describe('NewItemCategoryComponent', () => {
  let component: NewItemCategoryComponent;
  let fixture: ComponentFixture<NewItemCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewItemCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewItemCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
