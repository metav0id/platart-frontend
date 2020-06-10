import {Component, OnInit, ViewChild} from '@angular/core';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {ShopInventoryItem} from '../../../sales-princess/view-shop-inventory/view-shop-inventory-DTOs/ShopInventoryItem';
import {FormControl, Validators} from '@angular/forms';
import {ManagerWarehouseInfoService} from './manager-warehouse-info.service';
import {ShopDTO} from '../../shop-dto';
import {PeriodicElement} from './manager-warehouse-info-DTOs/PeriodicElement';
import {MatTableModule, MatTableDataSource, MatTable} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-manager-warehouse-info',
  templateUrl: './manager-warehouse-info.component.html',
  styleUrls: ['./manager-warehouse-info.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: {scope: 'managerKing/manageShopsInfo', alias: 'translate'}}]
})
export class ManagerWarehouseInfoComponent implements OnInit {
  // inventory type
  selectedShopRange: string;
  shopRange: string[] = ['Specific Shop', 'All Shops'];

  // table information
  displayedColumns: string[] = ['category', 'priceListPerUnit', 'quantity'];
  // displayedColumns: string[] = [ 'shop', 'category', 'quantity', 'priceListPerUnit', 'priceSalesPerUnit' ];
  dataSource = new MatTableDataSource();

  /** Category selection */
  public shopControl = new FormControl('', Validators.required);
  /** List of available shops */
  public selectedShopToDisplay = '';

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private managerShopsInfoService: ManagerWarehouseInfoService) {
  }

  ngOnInit(): void {
    this.getAllItems();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllItems(): void {
    this.managerShopsInfoService.getAllItems()
      .subscribe(JsonDto => {
        // this.dataSource = JsonDto;
        this.dataSource = new MatTableDataSource(JsonDto);
        this.dataSource.sort = this.sort;
      });
  }
}
