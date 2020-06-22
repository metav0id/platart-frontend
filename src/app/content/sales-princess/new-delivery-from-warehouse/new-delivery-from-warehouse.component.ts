import {TRANSLOCO_SCOPE, TranslocoService} from '@ngneat/transloco';
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatTable} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
// tslint:disable-next-line:max-line-length
import {NewDeliveryFromWarehouseDetailsComponent} from './new-delivery-from-warehouse-details/new-delivery-from-warehouse-details.component';
import {NewDeliveryFromWarehouseService} from './new-delivery-from-warehouse.service';
import {Shop} from '../../commonDTOs/shop';
import {AddDeliveryItemComponent} from './add-delivery-item/add-delivery-item.component';
import {TooltipPosition} from '@angular/material/tooltip';
import {TableItem} from './table-item';
import {AuthService} from '../../services/auth.service';

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
  public listNewItemsFromWarehouse: TableItem[] = [];

  /** Category selection */
  public shopControl = new FormControl('', Validators.required);

  /** List of available shops */
  public listShops: string[] = [];

  public selectedShopToFilterOnList = '';

  @ViewChild('myCheckinProductsTable') table: MatTable<any>;

  constructor(public dialog: MatDialog,
              private transloco: TranslocoService,
              private newDeliveryFromWarehouseService: NewDeliveryFromWarehouseService,
              private auth: AuthService) {
  }

  ngOnInit(): void {
    this.listShops = this.auth.getStoresList();
  }

  selectItem(element: TableItem): void {
    element.isChecked = !element.isChecked;
  }

  saveList(): void {
    this.listNewItemsFromWarehouse = this.newDeliveryFromWarehouseService.saveList(this.selectedShopToFilterOnList,
                                                                                    this.listNewItemsFromWarehouse);
    this.table.renderRows();
  }

  openDialogDeliveryDetails(element: TableItem): void {
    this.dialog.open(NewDeliveryFromWarehouseDetailsComponent, {
      width: '400px',
      data: element,
      autoFocus: false
    });
  }

  /**
   * Whole list is passed to dialog. There new elements are added to list.
   */
  openDialogAddItem(): void {
    const dialogRef = this.dialog.open(AddDeliveryItemComponent, {
      width: '400px',
      data: this.listNewItemsFromWarehouse
    });

    dialogRef.afterClosed().subscribe(result => {
      this.table.renderRows();
    });
  }

  getDeliveryItemList(shop: string) {
    this.newDeliveryFromWarehouseService.getNewDeliveryForShop(shop)
      .subscribe(JsonDto => {
        this.listNewItemsFromWarehouse = JsonDto;
        this.table.renderRows();
      });
  }
}
