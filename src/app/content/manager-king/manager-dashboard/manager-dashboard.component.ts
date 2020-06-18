import {Component, OnInit} from '@angular/core';
import {ManagerDashboardService} from './manager-dashboard.service';
import {TRANSLOCO_SCOPE, TranslocoService} from '@ngneat/transloco';
import {DateRangeDTO} from '../manager-king-dtos/DateRangeDTO';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: {scope: 'managerKing', alias: 'translate'}}]
})
export class ManagerDashboardComponent implements OnInit {

  // todo: Make view responsive (table already working as intended)

  dataLastMonth;
  dataCurrentMonth;
  dataYesterday;
  data;


  constructor(private managerDashboardService: ManagerDashboardService, private transloco: TranslocoService) {
    this.dataLastMonth = this.managerDashboardService.fetchDataLastMonth(this.createLastMonthChartDates());
    this.dataCurrentMonth = this.managerDashboardService.fetchDataCurrentMonth(this.createCurrentMonthChartDates());
    this.dataYesterday = this.managerDashboardService.fetchYesterdaysData(this.createYesterdaysChartDates());
    this.data = this.managerDashboardService.fetchActuals(this.createCurrentMonthChartDates());
  }

  createLastMonthChartDates(): DateRangeDTO {
    const tempStartDate = new Date();
    tempStartDate.setMonth(tempStartDate.getMonth() - 1);
    tempStartDate.setDate(1);
    const tempEndDate = new Date();
    tempEndDate.setMonth(tempStartDate.getMonth() - 1);
    return {
      startDate: tempStartDate.toISOString(),
      endDate: tempEndDate.toISOString()
    };
  }

  createCurrentMonthChartDates(): DateRangeDTO {
    const tempStartDate = new Date();
    tempStartDate.setDate(1);
    const tempEndDate = new Date();
    return {
      startDate: tempStartDate.toISOString(),
      endDate: tempEndDate.toISOString()
    };
  }

  createYesterdaysChartDates(): DateRangeDTO {
    const tempStartDate = new Date();
    tempStartDate.setDate(tempStartDate.getDate() - 1);
    const tempEndDate = new Date();
    return {
      startDate: tempStartDate.toISOString(),
      endDate: tempEndDate.toISOString()
    };
  }

  ngOnInit(): void {
  }
}
