import {Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTable} from '@angular/material/table';
import {NewitemcategoryService} from './new-item-category.service';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {TooltipPosition} from "@angular/material/tooltip";
import {FormControl} from "@angular/forms";


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
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  displayedColumns: string[] = ['select', 'category', 'isActivated'];
  // public listCategories: PeriodicElement[] = [];
  // selection = new SelectionModel<PeriodicElement>(true, []);



  public toogleDisplayActiveCategories = true;
  public listDisplayActiveCategories = ['Show actived', 'Show deactivated'];

  @ViewChild('myShopCheckinProductsTable') table: MatTable<any>;

  constructor(private newitemcategoryService: NewitemcategoryService) {
  }

  ngOnInit(): void {

  }

}
