import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {CheckedInItemsService} from './checked-in-items.service';
import {FormControl, Validators} from '@angular/forms';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {ShopDTO} from './checked-in-items-DTOs/shop-dto';

@Component({
  selector: 'app-checked-in-items',
  templateUrl: './checked-in-items.component.html',
  styleUrls: ['./checked-in-items.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: { scope: 'salesPrincess', alias: 'translate' }}]
})
export class CheckedInItemsComponent implements OnInit {

  /** Shop selection */
  public formControl = new FormControl('', Validators.required);

  public deliveryShop: string;
  public shopsList: ShopDTO[] = [{name: 'shop1'}, {name: 'shop2'}];

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = ['shop', 'category', 'priceListPerUnit', 'priceSalesPerUnit', 'itemLastSold'];
  dataSource = new MatTableDataSource();

  constructor(private checkedInItemsService: CheckedInItemsService) { }
  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.fetchAllShops();
  }

  fetchAllShops(): void {
    this.checkedInItemsService.getListShops().subscribe((observable) => {
      this.shopsList = observable;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCheckedInItemsList(): void {
    // tslint:disable-next-line:no-shadowed-variable
    this.checkedInItemsService.getCheckedInItems().subscribe((observable) => {
      this.dataSource = new MatTableDataSource(observable);
      console.log();
    });
    this.dataSource.sort = this.sort;
  }

  getCheckedInItemsListSpecificShop(): void {
    if (this.deliveryShop != null) {
      // tslint:disable-next-line:no-shadowed-variable
      this.checkedInItemsService.getCheckedInItemsListSpecificShop(this.deliveryShop).subscribe((observable) => {
        this.dataSource = new MatTableDataSource(observable);
        console.log();
      });
      this.dataSource.sort = this.sort;
    }
  }

}
