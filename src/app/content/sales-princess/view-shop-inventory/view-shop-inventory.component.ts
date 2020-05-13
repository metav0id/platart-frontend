import {Component, OnInit, ViewChild} from '@angular/core';
import {ShopInventoryItem} from './view-shop-inventory-DTOs/ShopInventoryItem';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {ViewShopInventoryService} from './view-shop-inventory.service';
import {observable} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';
import {Shop} from '../../commonDTOs/shop';

@Component({
  selector: 'app-view-shop-inventory',
  templateUrl: './view-shop-inventory.component.html',
  styleUrls: ['./view-shop-inventory.component.css']
})
export class ViewShopInventoryComponent implements OnInit {

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

  constructor(private viewShopInventoryService: ViewShopInventoryService) { }

  ngOnInit(): void {
    this.viewShopInventoryService.getListShops().subscribe( (JsonDto) => {
      this.listShops = JsonDto;
    } );
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
    console.log('Loading data for ' + shop);
    this.getShopItems();
  }

  // filter methods
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
