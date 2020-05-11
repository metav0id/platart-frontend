import {TRANSLOCO_SCOPE, TranslocoService} from '@ngneat/transloco';
import {Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {FormControl, Validators} from '@angular/forms';
import {WarehouseItemCategoryDTO} from '../../warehouse-queen/warehouseCategory/warehouse-item-category-DTO';
import {MatTable} from '@angular/material/table';
import {NewDeliveryToWarehouseService} from '../../warehouse-queen/new-delivery-to-warehouse/new-delivery-to-warehouse.service';
import {SalesItemCategoryDTO} from './sales-item-category-dto';
import {PeriodicElement} from './periodic-element';
import {MatDialog} from '@angular/material/dialog';
// tslint:disable-next-line:max-line-length
import {NewDeliveryFromWarehouseDetailsComponent} from './new-delivery-from-warehouse-details/new-delivery-from-warehouse-details.component';
import {NewDeliveryFromWarehouseService} from './new-delivery-from-warehouse.service';
import {Shop} from '../../commonDTOs/shop';
import {AddDeliveryItemComponent} from "./add-delivery-item/add-delivery-item.component";

@Component({
  selector: 'app-new-delivery-from-warehouse',
  templateUrl: './new-delivery-from-warehouse.component.html',
  styleUrls: ['./new-delivery-from-warehouse.component.css'],
  providers: [{
    provide: TRANSLOCO_SCOPE,
    useValue: {scope: 'salesPrincess/newDeliveryFromWarehouse', alias: 'translate'}
  }]
})

export class NewDeliveryFromWarehouseComponent implements OnInit {
  public displayedColumns: string[] = ['select', 'category', 'salesPrice', 'quantity', 'action'];
  public listNewItemsFromWarehouse: PeriodicElement[] = [];
  public selection = new SelectionModel<PeriodicElement>(true, []);

  /** Is used to increase position attribute of list elements constantly */
  private counter = 1;

  /** Category selection */
  public shopControl = new FormControl('', Validators.required);

  /** List of available shops */
  public listShops: Shop[] = [{name: 'shop1'}, {name: 'shop2'}];
  public selectedShopToFilterOnList = '';

  @ViewChild('myCheckinProductsTable') table: MatTable<any>;

  constructor(public dialog: MatDialog,
              private transloco: TranslocoService,
              private newDeliveryFromWarehouseService: NewDeliveryFromWarehouseService) {
  }

  ngOnInit(): void {

    // TODO implment method to get all Shops
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listNewItemsFromWarehouse.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      console.log('All lines are selected');
      this.listNewItemsFromWarehouse.forEach(row => this.selection.select(row));
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  saveList(): void {
    // this.newDeliveryToWarehouseService.saveList(this.listNewItemsFromWarehouse);
    this.listNewItemsFromWarehouse = [];
    this.table.renderRows();
  }

  openDialogDeliveryDetails(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(NewDeliveryFromWarehouseDetailsComponent, {
      width: '250px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
    });
  }

  openDialogAddItem(): void {
    const dialogRef = this.dialog.open(AddDeliveryItemComponent, {
      width: '250px',
      data: this.listNewItemsFromWarehouse
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      this.table.renderRows();
    });
  }

  getDeliveryItemList(shop: string) {
    console.log('Loading data for ' + shop);
    this.newDeliveryFromWarehouseService.getNewDeliveryForShop(shop)
      .subscribe(JsonDto => {
        this.listNewItemsFromWarehouse = JsonDto;
        console.log(this.listNewItemsFromWarehouse);
        this.table.renderRows();
      });
  }

}
