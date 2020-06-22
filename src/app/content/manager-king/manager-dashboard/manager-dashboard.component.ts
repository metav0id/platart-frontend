import {Component, OnInit} from '@angular/core';
import {ManagerDashboardService} from './manager-dashboard.service';
import {TRANSLOCO_SCOPE, TranslocoService} from '@ngneat/transloco';
import {DateRangeDTO} from '../manager-king-dtos/DateRangeDTO';
import {MonthToDateReportingDto} from '../manager-king-dtos/MonthToDateReportingDto';
import {DailyReportingDto} from '../manager-king-dtos/DailyReportingDto';
import {log} from 'util';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: {scope: 'managerKing', alias: 'translate'}}]
})
export class ManagerDashboardComponent implements OnInit {

  // todo: Make view responsive (table already working as intended)

  dataLastMonth: MonthToDateReportingDto;
  dataCurrentMonth: MonthToDateReportingDto;
  dataYesterday: MonthToDateReportingDto;
  data: DailyReportingDto[];


  constructor(private managerDashboardService: ManagerDashboardService, private transloco: TranslocoService) {
    this.managerDashboardService.fetchActuals(this.createCurrentMonthChartDates())
      .subscribe((data) => {this.data = data; });
    this.managerDashboardService.fetchDataLastMonth(this.createLastMonthChartDates())
      .subscribe((dataLastMonth) => {this.dataLastMonth = dataLastMonth; });
    this.managerDashboardService.fetchDataCurrentMonth(this.createCurrentMonthChartDates())
      .subscribe((dataCurrentMonth) => {this.dataCurrentMonth = dataCurrentMonth; });
    this.managerDashboardService.fetchYesterdaysData(this.createYesterdaysChartDates())
      .subscribe((dataYesterday) => {this.dataYesterday = dataYesterday; });
  }

  createLastMonthChartDates(): DateRangeDTO {
    const tempStartDate = new Date(2020, 4, 1, 0, 0, 0);
    // tempStartDate.setMonth(tempStartDate.getMonth() - 1);
    // tempStartDate.setDate(1);
    // tempStartDate.setHours(0, 0, 0);
    const tempEndDate = new Date(2020, 4, 31, 23, 59, 59);
    // tempEndDate.setMonth(tempEndDate.getMonth() - 1);
    // tempEndDate.setDate(tempEndDate.getDate() - 1);
    // tempEndDate.setHours(23, 59, 59);
    return {
      startDate: tempStartDate.toISOString(),
      endDate: tempEndDate.toISOString()
    };
  }

  createCurrentMonthChartDates(): DateRangeDTO {
    const tempStartDate = new Date(2020, 5, 1, 0, 0, 0);
    // tempStartDate.setDate(1);
    // tempStartDate.setHours(0, 0, 0);
    const tempEndDate = new Date(2020, 5, 20, 23, 59);
    // tempEndDate.setDate(tempEndDate.getDate() - 1);
    // tempEndDate.setHours(23, 59, 59);
    console.log(tempStartDate, tempEndDate);
    return {
      startDate: tempStartDate.toISOString(),
      endDate: tempEndDate.toISOString()
    };
  }

  createYesterdaysChartDates(): DateRangeDTO {
    const tempStartDate = new Date(2020, 5, 19, 0, 0, 0);
    // tempStartDate.setDate(tempStartDate.getDate() - 1);
    // tempStartDate.setHours(0, 0, 0);
    const tempEndDate = new Date(2020, 5, 19, 23, 59, 0);
    // tempEndDate.setDate(tempEndDate.getDate() - 1);
    // tempEndDate.setHours(23, 59, 59);
    return {
      startDate: tempStartDate.toISOString(),
      endDate: tempEndDate.toISOString()
    };
  }

  ngOnInit(): void {

  }
}
