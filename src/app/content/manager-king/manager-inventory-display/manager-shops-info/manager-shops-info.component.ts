import {Component, OnInit, ViewChild} from '@angular/core';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {ShopInventoryItem} from '../../../sales-princess/view-shop-inventory/view-shop-inventory-DTOs/ShopInventoryItem';
import {FormControl, Validators} from '@angular/forms';
import {ManagerShopsInfoService} from './manager-shops-info.service';
import {ShopDTO} from '../../shop-dto';
import {PeriodicElement} from './manager-shops-info-DTOs/PeriodicElement';
import {MatTableModule, MatTableDataSource, MatTable} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-manager-shops-info',
  templateUrl: './manager-shops-info.component.html',
  styleUrls: ['./manager-shops-info.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: { scope: 'managerKing/manageShopsInfo', alias: 'translate' }}]
})
export class ManagerShopsInfoComponent implements OnInit {
  // inventory type
  selectedShopRange: string;
  shopRange: string[] = ['Specific Shop', 'All Shops'];

  // table information
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = [ 'shop', 'category', 'quantity', 'priceListPerUnit', 'priceSalesPerUnit' ];
  dataSource = new MatTableDataSource();

  /** Category selection */
  public shopControl = new FormControl('', Validators.required);
  /** List of available shops */
  public listShops: ShopDTO[] = [{name: 'shop1'}, {name: 'shop2'}];
  public selectedShopToFilterOnList = '';
  public selectedShopToDisplay = '';

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private managerShopsInfoService: ManagerShopsInfoService) {
  }

  ngOnInit(): void {
    this.managerShopsInfoService.getListShops().subscribe( (JsonDto) => {
      this.listShops = JsonDto;
    } );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getInventoryItemsList(selectedShopToFilterOnList: string) {
    this.selectedShopToDisplay = this.selectedShopToFilterOnList;

    this.managerShopsInfoService.getSpecificItemsObs(this.selectedShopToFilterOnList).subscribe((observable) => {
      console.log(observable);
      this.dataSource = new MatTableDataSource(observable);
      this.dataSource.sort = this.sort;
    });
  }

  getAllInventoryItemList() {
    this.selectedShopToDisplay = this.selectedShopToFilterOnList;

    this.managerShopsInfoService.getSpecificItemsObs('Ventura').subscribe((observable) => {
      console.log(observable);
      this.dataSource = new MatTableDataSource(observable);
      this.dataSource.sort = this.sort;
    });
  }
}
