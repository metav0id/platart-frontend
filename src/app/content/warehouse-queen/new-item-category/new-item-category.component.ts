import {Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTable} from '@angular/material/table';
import {NewitemcategoryService} from './new-item-category.service';


/** Is used for table elements */
export interface PeriodicElement {
  position: number;
  category: string;
}

@Component({
  selector: 'app-new-item-category',
  templateUrl: './new-item-category.component.html',
  styleUrls: ['./new-item-category.component.css']
})
export class NewItemCategoryComponent implements OnInit {
  displayedColumns: string[] = ['select', 'category', 'updateItem'];
  public listCategories: PeriodicElement[] = [];
  selection = new SelectionModel<PeriodicElement>(true, []);

  newCategoryElement: PeriodicElement = {
    position: 0,
    category: 'chooseCategory'
  };
  availableItems: string = 'check existance';

  @ViewChild('myShopCheckinProductsTable') table: MatTable<any>;

  constructor(private newitemcategoryService: NewitemcategoryService) {
  }

  ngOnInit(): void {
    this.loadAllCategories();
  }


  verifyCategoryExistant(): boolean {
    this.availableItems = 'category element is new';
    for (let categoryElement of this.listCategories) {
      if (categoryElement.category.toString().toUpperCase() === this.newCategoryElement.category.toString().toUpperCase()) {
        console.log('element already in list');
        this.availableItems = 'element already in list';

        return true;
      }
    }
    return false;
  }

  createNewCategory() {
    if (!this.verifyCategoryExistant()) {
      this.newCategoryElement.category = this.newCategoryElement.category.toLowerCase();
      this.listCategories.push(this.newCategoryElement);

      this.newitemcategoryService.saveNewCategory(this.newCategoryElement.category);
      this.loadAllCategories();
      this.table.renderRows();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listCategories.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      console.log('All lines are selected');
      this.listCategories.forEach(row => this.selection.select(row));
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  updateButton(periodicElement: PeriodicElement) {
    console.log('implement periodic element');
  }

  deleteSelectedCategory() {
    console.log('delete selected categories');
  }

  loadAllCategories(): void {
    this.newitemcategoryService.getAllCategories().subscribe(JsonDto => {
      let counter: number = 1;
      this.listCategories = [];
      for (const item of JsonDto) {
        this.listCategories.push({position: counter, category: item.category});
        counter++;
      }
    });
  }

}
