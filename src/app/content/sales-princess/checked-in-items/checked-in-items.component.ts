import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {CheckedInItemsService} from './checked-in-items.service';
import {FormControl, Validators} from '@angular/forms';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {ShopDTO} from './checked-in-items-DTOs/shop-dto';
import {MatDialog} from '@angular/material/dialog';
import {CheckedInItemsDetailsComponent} from './checked-in-items-details/checked-in-items-details.component';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-checked-in-items',
  templateUrl: './checked-in-items.component.html',
  styleUrls: ['./checked-in-items.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: { scope: 'salesPrincess', alias: 'translate' }}]
})
export class CheckedInItemsComponent implements OnInit {

  startDate = '';
  endDate = '';

  /** Shop selection */
  public formControl = new FormControl('', Validators.required);

  public deliveryShop: string;
  public shopsList: ShopDTO[] = [{name: 'shop1'}, {name: 'shop2'}];

  displayedColumns: string[] = ['date', 'category', 'priceListPerUnit', 'popup'];
  dataSource = new MatTableDataSource();

  constructor(public dialog: MatDialog,
              private checkedInItemsService: CheckedInItemsService) { }
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
      console.log(observable);
    });
    this.dataSource.sort = this.sort;
  }

  getCheckedInItemsListSpecificShop(): void {
    if (this.deliveryShop != null && this.startDate != '' && this.endDate != '') {
      // tslint:disable-next-line:no-shadowed-variable
      /*this.checkedInItemsService.getCheckedInItemsListSpecificShop(this.deliveryShop).subscribe((observable) => {
        this.dataSource = new MatTableDataSource(observable);
        // console.log(observable);
      });*/
      this.checkedInItemsService.getCheckedInItemsListSpecificShopDate(this.deliveryShop, this.startDate, this.endDate).subscribe((observable) => {
        this.dataSource = new MatTableDataSource(observable);
        // console.log(observable);
      });
      this.dataSource.sort = this.sort;
    }
  }

  openDialogCheckInDetails(element: any) {

    const dialogRef = this.dialog.open(CheckedInItemsDetailsComponent, {
      width: '250px',
      data: element
    });

    console.log('some details: ' +  element);
    dialogRef.afterClosed().subscribe((DataObservable) => {
      console.log(DataObservable);
    });
  }

  startDateSelection($event: MatDatepickerInputEvent<Date>) {
    const newDate: Date = $event.value;
    this.startDate = newDate.toISOString();

    // tslint:disable-next-line:triple-equals
    if (this.endDate == '') {
      const newEndDate: Date = new Date(newDate.getTime() + (1000 * 60 * 60 * 24));
      this.endDate = newEndDate.toISOString();
    }
  }

  endDateSelection($event: MatDatepickerInputEvent<Date>) {
    const newDate: Date = $event.value;
    this.endDate = newDate.toISOString();
  }
}
