import {Component, OnInit, ViewChild} from '@angular/core';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {FormControl, Validators} from '@angular/forms';
import {ManagerShopsInfoService} from './manager-shops-info.service';
import {ShopDTO} from '../shop-dto';
import {MatSort} from '@angular/material/sort';
import {PeriodicElement} from "./manager-shops-info-DTOs/PeriodicElement";

@Component({
  selector: 'app-manage-shops-info',
  templateUrl: './manager-shops-info.component.html',
  styleUrls: ['./manager-shops-info.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: {scope: 'managerKing', alias: 'translate'}}]
})
export class ManagerShopsInfoComponent implements OnInit {

  // table information
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  /** Category selection */
  public shopControl = new FormControl('', Validators.required);

  /** List of available shops */
  public listShops: ShopDTO[] = [{name: 'shop1'}, {name: 'shop2'}];
  public selectedShopToFilterOnList = '';
  public selectedShopToDisplay = '';

  constructor(private managerShopsInfoService: ManagerShopsInfoService) {
  }

  ngOnInit(): void {
    const ELEMENT_DATA: PeriodicElement[] = [
      {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
      {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
      {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
      {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
      {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
      {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
      {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
      {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
      {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
      {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    ];
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);

    this.dataSource.sort = this.sort;

    /*this.managerShopsInfoService.getListShops().subscribe( (JsonDto) => {
      this.listShops = JsonDto;
    } );*/
  }

  // fetch inventory data
  /*getShopItems(): void {
    this.selectedShopToDisplay = this.selectedShopToFilterOnList;
    const shopItems: ShopInventoryItem[] = [];
    this.managerShopsInfoService.getAllItemsObs(this.selectedShopToFilterOnList).subscribe((observable) => {
      console.log(observable);
      this.dataSource = new MatTableDataSource(observable);
      this.table.renderRows();
    });
  }*/

  getDeliveryItemList(selectedShopToFilterOnList: string) {
    this.selectedShopToDisplay = selectedShopToFilterOnList;
    console.log(selectedShopToFilterOnList);
  }

  // filter methods
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
