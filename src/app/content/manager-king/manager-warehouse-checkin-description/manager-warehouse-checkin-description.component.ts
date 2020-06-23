import {Component, OnInit, ViewChild} from '@angular/core';
import {TooltipPosition} from '@angular/material/tooltip';
import {FormControl} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ManagerWarehouseCheckinDescriptionService} from './manager-warehouse-checkin-description.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

@Component({
  selector: 'app-manager-warehouse-checkin-description',
  templateUrl: './manager-warehouse-checkin-description.component.html',
  styleUrls: ['./manager-warehouse-checkin-description.component.css'],
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
export class ManagerWarehouseCheckinDescriptionComponent implements OnInit {

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  displayedColumns: string[] = ['category', 'quantity', 'priceListPerUnit', 'priceSupplierPerUnit', 'supplierName', 'createDateTime'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private managerWarehouseCheckinDescriptionService: ManagerWarehouseCheckinDescriptionService) {
  }

  startDate = '';
  endDate = '';
  // Date input
  eventsTime: string[] = [];

  ngOnInit(): void {
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
    if (this.startDate != '' && this.endDate != '') {
      this.managerWarehouseCheckinDescriptionService.getSoldItemsList(this.startDate, this.endDate)
        .subscribe((observable) => {
          this.dataSource = new MatTableDataSource(observable);
          this.dataSource.sort = this.sort;
        });
    } else {
      console.log('Please select date range');
    }
  }

}
