import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {SalesDescriptionService} from './sales-description.service';
import {MatSort} from '@angular/material/sort';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {TooltipPosition} from '@angular/material/tooltip';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {ShopDTO} from '../checked-in-items/checked-in-items-DTOs/shop-dto';

@Component({
  selector: 'app-manager-sales-description',
  templateUrl: './sales-description.component.html',
  styleUrls: ['./sales-description.component.css'],
  providers: [{
    provide: TRANSLOCO_SCOPE,
    useValue: {scope: 'salesPrincess', alias: 'translate'}
  }]
})
export class SalesDescriptionComponent implements OnInit {

  public deliveryShop = '';
  public shopsList: ShopDTO[] = [];

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  displayedColumns: string[] = ['shop', 'category', 'revenuePerUnit', 'priceListPerUnit', 'priceSalesPerUnit', 'itemLastSold'];

  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private managerSalesDescriptionService: SalesDescriptionService) {
  }

  startDate: string = '';
  endDate: string = '';
  // Date input
  eventsTime: string[] = [];

  public formControl = new FormControl('', Validators.required);

  ngOnInit(): void {
    this.fetchAllShops();
  }

  fetchAllShops(): void {
    this.managerSalesDescriptionService.getListShops().subscribe((observable) => {
      this.shopsList = observable;
    });
  }

  startDateSelection($event: MatDatepickerInputEvent<Date>) {
    const newDate: Date = $event.value;
    this.startDate = newDate.toISOString();
    this.eventsTime.push(newDate.toISOString());
  }

  endDateSelection($event: MatDatepickerInputEvent<Date>) {
    const newDate: Date = $event.value;
    this.endDate = newDate.toISOString();
    this.eventsTime.push(newDate.toISOString());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getSoldItemsList(): void {
    // tslint:disable-next-line:triple-equals
    if (this.startDate != '' && this.endDate != '' && this.deliveryShop != '') {
      this.managerSalesDescriptionService.getSoldItemsList(this.startDate, this.endDate)
        .subscribe((observable) => {
          console.log(observable);
          this.dataSource = new MatTableDataSource(observable);
          this.dataSource.sort = this.sort;
        });
    } else {
      console.log('Please select date range');
    }
  }

}
