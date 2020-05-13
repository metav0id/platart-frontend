import {Component, OnInit, ViewChild} from '@angular/core';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {FormControl, Validators} from '@angular/forms';
import {Shop} from './manager-shops-info-DTOs/Shop';
import {ManagerShopsInfoService} from './manager-shops-info.service';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {ShopInventoryItem} from '../../sales-princess/view-shop-inventory/view-shop-inventory-DTOs/ShopInventoryItem';

@Component({
  selector: 'app-manage-shops-info',
  templateUrl: './manager-shops-info.component.html',
  styleUrls: ['./manager-shops-info.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: { scope: 'managerKing/manageShopsInfo', alias: 'translate' }}]
})
export class ManagerShopsInfoComponent implements OnInit {

  // table information
  displayedColumns: string[] = ['category', 'quantity', 'priceListPerUnit', 'priceSalesPerUnit' ];
  dataSource = new MatTableDataSource();
  @ViewChild('myShopsItemsTable') table: MatTable<any>;

  /** Category selection */
  public shopControl = new FormControl('', Validators.required);

  /** List of available shops */
  public listShops: Shop[] = [{name: 'shop1'}, {name: 'shop2'}];
  public selectedShopToFilterOnList = '';
  public selectedShopToDisplay = '';

  constructor(private managerShopsInfoService: ManagerShopsInfoService) { }

  ngOnInit(): void {
    this.managerShopsInfoService.getListShops().subscribe( (JsonDto) => {
      this.listShops = JsonDto;
    } );
  }

  // fetch inventory data
  getShopItems(): void {
    this.selectedShopToDisplay = this.selectedShopToFilterOnList;
    const shopItems: ShopInventoryItem[] = [];
    this.managerShopsInfoService.getAllItemsObs(this.selectedShopToFilterOnList).subscribe((observable) => {
      console.log(observable);
      this.dataSource = new MatTableDataSource(observable);
      this.table.renderRows();
    });
  }

  getDeliveryItemList(selectedShopToFilterOnList: string) {
    console.log(selectedShopToFilterOnList);
  }

  // filter methods
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
