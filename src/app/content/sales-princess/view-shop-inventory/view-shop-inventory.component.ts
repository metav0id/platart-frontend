import {Component, OnInit, ViewChild} from '@angular/core';
import {ShopInventoryItem} from './view-shop-inventory-DTOs/ShopInventoryItem';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {ViewShopInventoryService} from './view-shop-inventory.service';
import {observable} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';
import {Shop} from '../../commonDTOs/shop';
import {TRANSLOCO_SCOPE, TranslocoService} from '@ngneat/transloco';
import {TooltipPosition} from '@angular/material/tooltip';
import {AuthService} from '../../services/auth.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

@Component({
  selector: 'app-view-shop-inventory',
  templateUrl: './view-shop-inventory.component.html',
  styleUrls: ['./view-shop-inventory.component.css'],
  providers: [
    {provide: TRANSLOCO_SCOPE, useValue: {scope: 'salesPrincess', alias: 'translate'}},
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class ViewShopInventoryComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  // table information
  displayedColumns: string[] = ['category', 'quantity', 'priceListPerUnit', 'priceSalesPerUnit'];
  dataSource = new MatTableDataSource();
  @ViewChild('myShopsItemsTable') table: MatTable<any>;

  /** Category selection */
  public shopControl = new FormControl('', Validators.required);

  /** List of available shops */
  public listShops: string[] = [];
  public selectedShopToFilterOnList = '';
  public selectedShopToDisplay = '';

  constructor(private viewShopInventoryService: ViewShopInventoryService, private transloco: TranslocoService, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.listShops = this.auth.getStoresList();
  }

  // fetch inventory data
  getShopItems(): void {
    this.selectedShopToDisplay = this.selectedShopToFilterOnList;
    const shopItems: ShopInventoryItem[] = [];
    this.viewShopInventoryService.getAllItemsObs(this.selectedShopToFilterOnList).subscribe((observable) => {
      console.log(observable);
      this.dataSource = new MatTableDataSource(observable);
      this.table.renderRows();
    });
  }

  getDeliveryItemList(shop: string) {
    this.getShopItems();
  }

  // filter methods
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
