import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {NewitemcategoryService} from './new-item-category.service';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {TooltipPosition} from '@angular/material/tooltip';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {WarehouseItemCategoryDTO} from '../warehouseCategory/warehouse-item-category-DTO';
import Swal from 'sweetalert2';


/** Is used for table elements */
export interface PeriodicElement {
  position: number;
  category: string;
}

@Component({
  selector: 'app-new-item-category',
  templateUrl: './new-item-category.component.html',
  styleUrls: ['./new-item-category.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: {scope: 'warehouseQueen', alias: 'translate'}}]
})
export class NewItemCategoryComponent implements OnInit {
  /** tooltip features**/
  public positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  public position = new FormControl(this.positionOptions[0]);

  public displayedColumns: string[] = ['select', 'category', 'isActivated'];

  public optionsSelection = ['all', 'activated', 'deactivated'];
  public selectedOption = this.optionsSelection[0];

  public listCategories: WarehouseItemCategoryDTO[] = [];

  public myForm: FormGroup;

  @ViewChild('myShopCheckinProductsTable') table: MatTable<any>;

  constructor(private newitemcategoryService: NewitemcategoryService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  getCategories() {
    if (this.optionsSelection[0] === this.selectedOption) {
      this.newitemcategoryService.getAllCategories().subscribe(obj => {
        this.listCategories = obj;
        this.table.renderRows();
      });
    } else if (this.optionsSelection[1] === this.selectedOption) {
      this.newitemcategoryService.getAllActivatedCategories().subscribe(obj => {
        this.listCategories = obj;
        this.table.renderRows();
      });
    } else {
      this.newitemcategoryService.getAllDeactivatedCategories().subscribe(obj => {
        this.listCategories = obj;
        this.table.renderRows();
      });
    }
  }

  createForm() {
    this.myForm = this.formBuilder.group({
      category: ['', [Validators.required]]
    });
  }

  onSubmit(data) {
    if (!this.myForm.invalid) {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Saving new category. One moment please...'
      });
      Swal.showLoading();
      this.newitemcategoryService.saveNewCategory(data.category).subscribe(result => {
        Swal.close();
        if (result) {
          Swal.fire(
            'Success',
            'Category saved.',
            'success'
          );
          this.table.renderRows();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Category could not be saved. Does it already exists?'
          });
        }
      });
    }
  }

}
