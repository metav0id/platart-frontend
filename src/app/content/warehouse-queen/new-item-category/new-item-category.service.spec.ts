import { TestBed } from '@angular/core/testing';

import { NewitemcategoryService } from './newitemcategory.service';

describe('NewitemcategoryService', () => {
  let service: NewitemcategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewitemcategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
