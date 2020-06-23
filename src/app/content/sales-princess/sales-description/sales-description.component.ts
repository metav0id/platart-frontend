import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {SalesDescriptionService} from './sales-description.service';
import {MatSort} from '@angular/material/sort';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {TooltipPosition} from '@angular/material/tooltip';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import Swal from 'sweetalert2';
import {AuthService} from '../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {SalesDescriptionDetailsComponent} from './sales-description-details/sales-description-details.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

@Component({
  selector: 'app-manager-sales-description',
  templateUrl: './sales-description.component.html',
  styleUrls: ['./sales-description.component.css'],
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
export class SalesDescriptionComponent implements OnInit {
  public listShops1: string[] = new Array();
  public deliveryShop = '';
  public shopsList: string[] = [];

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  displayedColumns: string[] = ['itemLastSold', 'category', 'priceListPerUnit', 'priceSalesPerUnit', 'revenuePerUnit'];

  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
          public dialog: MatDialog,
          private managerSalesDescriptionService: SalesDescriptionService,
          private auth: AuthService) {
  }

  startDate = '';
  endDate = '';
  // Date input
  eventsTime: string[] = [];

  public formControl = new FormControl('', Validators.required);

  ngOnInit(): void {
    this.shopsList = this.auth.getStoresList();
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
      this.managerSalesDescriptionService.getSoldItemsList(this.deliveryShop, this.startDate, this.endDate)
        .subscribe((observable) => {
          this.dataSource = new MatTableDataSource(observable);
          this.dataSource.sort = this.sort;
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please make sure the shop is selected as well as the start- and end-dates.'
      });
    }
  }

  openDialogSalesDescriptionItem(element: any) {
    const dialogRef = this.dialog.open(SalesDescriptionDetailsComponent, {
      width: '250px',
      data: element
    });

    dialogRef.afterClosed().subscribe((DataObservable) => {
    });
  }
}
