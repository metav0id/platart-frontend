import {Component, DoCheck, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDatepicker, MatDatepickerInputEvent} from '@angular/material/datepicker';
import {TooltipPosition} from '@angular/material/tooltip';
import {Subject} from 'rxjs';

import {ActivatedRoute, Router} from '@angular/router';
import {ManagerDashboardService} from '../dashboard-overview/manager-dashboard.service';
import {DateRangeDTO} from '../../manager-king-dtos/DateRangeDTO';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

@Component({
  selector: 'app-manager-dashboard-category',
  templateUrl: './manager-dashboard-category.component.html',
  styleUrls: ['./manager-dashboard-category.component.css'],
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
export class ManagerDashboardCategoryComponent implements OnInit {

  startDate;
  endDate;
  tempDate;
  maxDate: Date;
  minDate: Date;
  hbarData;
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  constructor(private managerDashboardService: ManagerDashboardService, private route: ActivatedRoute, private router: Router) {
    this.endDate = new FormControl(new Date());
    this.tempDate = new Date();
    this.tempDate.setDate(this.tempDate.getDate() - 14);
    this.startDate = new FormControl(this.tempDate);
    this.maxDate = new Date();
    this.minDate = this.maxDate;

    const range: DateRangeDTO = {
      endDate: new Date().toISOString(),
      startDate: this.tempDate.toISOString()
    };
    this.managerDashboardService.fetchCategoryData(range)
      .subscribe((hbarData) => {this.hbarData = hbarData; });
  }


  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = '';
  showYAxisLabel = false;
  yAxisLabel = '';
  showLabels = false;
  timeline = true;
  colorScheme = {
    domain: ['#FFA07A', '#E9967A', '#FA8072', '#F08080', '#CD5C5C', '#B22222', '#8B0000']
  };


  ngOnInit(): void {
    // const range: DateRangeDTO = {
    //   startDate: this.startDate.toISOString(),
    //   endDate: this.endDate.toISOString()
    // };
    //
    // this.managerDashboardService.fetchCategoryData(range)
    //   .subscribe((hbarData) => {this.hbarData = hbarData; });
  }

  refreshCategoryGraph(pickerStart: MatDatepicker<any>, pickerEnd: MatDatepicker<any>) {
    this.startDate = pickerStart;
    this.endDate = pickerEnd;
    const range: DateRangeDTO = {
      startDate: this.startDate.toISOString(),
      endDate: this.endDate.toISOString()
  };
    this.managerDashboardService.fetchCategoryData(range)
      .subscribe((hbarData) => {this.hbarData = hbarData; });
    // if (this.startDate < this.endDate) {
    //   this.router.navigate(['reload']);
    //   this.ngOnInit();
    // }
  }

  startDateSelection($event: MatDatepickerInputEvent<Date>) {
    const newDate: Date = $event.value;

  }

  endDateSelection($event: MatDatepickerInputEvent<Date>) {
    const newDate: Date = $event.value;
  }





}
