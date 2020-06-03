import {TRANSLOCO_SCOPE, TranslocoService} from '@ngneat/transloco';
import {Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {FormControl, Validators} from '@angular/forms';
import {WarehouseItemCategoryDTO} from '../../warehouse-queen/warehouseCategory/warehouse-item-category-DTO';
import {MatTable} from '@angular/material/table';
import {NewDeliveryToWarehouseService} from '../../warehouse-queen/new-delivery-to-warehouse/new-delivery-to-warehouse.service';
import {SalesItemCategoryDTO} from './sales-item-category-dto';
import {DeliveryItemFromWarehouseDTO} from './DeliveryItemFromWarehouseDTO';
import {MatDialog} from '@angular/material/dialog';
// tslint:disable-next-line:max-line-length
import {NewDeliveryFromWarehouseDetailsComponent} from './new-delivery-from-warehouse-details/new-delivery-from-warehouse-details.component';
import {NewDeliveryFromWarehouseService} from './new-delivery-from-warehouse.service';
import {Shop} from '../../commonDTOs/shop';
import {AddDeliveryItemComponent} from "./add-delivery-item/add-delivery-item.component";
import {TooltipPosition} from "@angular/material/tooltip";

@Component({
  selector: 'app-new-delivery-from-warehouse',
  templateUrl: './new-delivery-from-warehouse.component.html',
  styleUrls: ['./new-delivery-from-warehouse.component.css'],
  providers: [{
    provide: TRANSLOCO_SCOPE,
    useValue: {scope: 'salesPrincess', alias: 'translate'}
  }]
})

export class NewDeliveryFromWarehouseComponent implements OnInit {
  /** tooltip features**/
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  public displayedColumns: string[] = ['select', 'category', 'salesPrice', 'quantity', 'action'];
  public listNewItemsFromWarehouse: DeliveryItemFromWarehouseDTO[] = [];
  public selection = new SelectionModel<DeliveryItemFromWarehouseDTO>(true, []);

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
    this.newDeliveryFromWarehouseService.getListShops().subscribe(JSON => this.listShops = JSON);
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
  checkboxLabel(row?: DeliveryItemFromWarehouseDTO): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.identifierOnDeliveryList + 1}`;
  }

  saveList(): void {
    this.newDeliveryFromWarehouseService.saveList(this.selectedShopToFilterOnList, this.listNewItemsFromWarehouse);
    this.listNewItemsFromWarehouse = [];
    this.table.renderRows();
  }

  openDialogDeliveryDetails(element: DeliveryItemFromWarehouseDTO): void {
    const dialogRef = this.dialog.open(NewDeliveryFromWarehouseDetailsComponent, {
      width: '250px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
    });
  }

  /**
   * Whole list is passed to dialog. There new elements are added to list.
   */
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
