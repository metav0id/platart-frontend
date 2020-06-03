import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {ManagerSalesDescriptionService} from './manager-sales-description.service';
import {MatSort} from '@angular/material/sort';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {TooltipPosition} from "@angular/material/tooltip";

@Component({
  selector: 'app-manager-sales-description',
  templateUrl: './manager-sales-description.component.html',
  styleUrls: ['./manager-sales-description.component.css']
})
export class ManagerSalesDescriptionComponent implements OnInit {
  /** tooltip features**/
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  displayedColumns: string[] = ['category', 'shop', 'priceListPerUnit', 'itemLastSold'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private managerSalesDescriptionService: ManagerSalesDescriptionService) { }

  startDate: string = '';
  endDate: string = '';
  // Date input
  eventsTime: string[] = [];

  ngOnInit(): void {
  }

  startDateSelection($event: MatDatepickerInputEvent<Date>) {
    const newDate: Date = $event.value;
    this.startDate = newDate.toISOString();
    this.eventsTime.push( newDate.toISOString() );
  }

  endDateSelection($event: MatDatepickerInputEvent<Date>) {
    const newDate: Date = $event.value;
    this.endDate = newDate.toISOString();
    this.eventsTime.push( newDate.toISOString() );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getSoldItemsList(): void {
    if ( this.startDate != '' && this.endDate != '') {
      this.managerSalesDescriptionService.getSoldItemsList(this.startDate, this.endDate )
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
