import {Component, OnInit, ViewChild} from '@angular/core';
import {ManagerDashboardService} from './manager-dashboard.service';
import {TRANSLOCO_SCOPE, TranslocoService} from '@ngneat/transloco';
import {DateRangeDTO} from '../../manager-king-dtos/DateRangeDTO';
import {MonthToDateReportingDto} from '../../manager-king-dtos/MonthToDateReportingDto';
import {DailyReportingDto} from '../../manager-king-dtos/DailyReportingDto';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: {scope: 'managerKing', alias: 'translate'}}]
})
export class ManagerDashboardComponent implements OnInit {

  dataLastMonth: MonthToDateReportingDto = this.initializeMTDDTO();
  dataCurrentMonth: MonthToDateReportingDto = this.initializeMTDDTO();
  dataYesterday: MonthToDateReportingDto = this.initializeMTDDTO();
  actualsData: DailyReportingDto[] = this.initializeDRDTO();

  constructor(private managerDashboardService: ManagerDashboardService, private transloco: TranslocoService) {
    this.managerDashboardService.fetchActuals(this.createCurrentMonthChartDates())
      .subscribe((actualsData) => this.actualsData = actualsData );
    this.managerDashboardService.fetchDataLastMonth(this.createLastMonthChartDates())
      .subscribe((dataLastMonth) => this.dataLastMonth = dataLastMonth );
    this.managerDashboardService.fetchDataCurrentMonth(this.createCurrentMonthChartDates())
      .subscribe((dataCurrentMonth) => this.dataCurrentMonth = dataCurrentMonth );
    this.managerDashboardService.fetchYesterdaysData(this.createYesterdaysChartDates())
      .subscribe((dataYesterday) => this.dataYesterday = dataYesterday );
  }

  createLastMonthChartDates(): DateRangeDTO {
    const intermediateDate = new Date();
    const tempYear = intermediateDate.getFullYear();
    const tempMonth = intermediateDate.getMonth();
    const tempDay = intermediateDate.getDate();
    const tempStartDate = new Date(tempYear, tempMonth - 1, 1, 0, 0, 0);
    const tempEndDate = new Date(tempYear, tempMonth - 1, tempDay - 1, 23, 59, 59);
    return {
      startDate: tempStartDate.toISOString(),
      endDate: tempEndDate.toISOString()
    };
  }

  createCurrentMonthChartDates(): DateRangeDTO {
    const intermediateDate = new Date();
    const tempYear = intermediateDate.getFullYear();
    const tempMonth = intermediateDate.getMonth();
    const tempDay = intermediateDate.getDate();
    const tempStartDate = new Date(tempYear, tempMonth, 1, 0, 0, 0);
    const tempEndDate = new Date(tempYear, tempMonth, tempDay - 1, 23, 59, 59);
    return {
      startDate: tempStartDate.toISOString(),
      endDate: tempEndDate.toISOString()
    };
  }

  createYesterdaysChartDates(): DateRangeDTO {
    const intermediateDate = new Date();
    const tempYear = intermediateDate.getFullYear();
    const tempMonth = intermediateDate.getMonth();
    const tempDay = intermediateDate.getDate();
    const tempStartDate = new Date(tempYear, tempMonth, tempDay - 1, 0, 0, 0);
    const tempEndDate = new Date(tempYear, tempMonth, tempDay - 1, 23, 59, 59);
    return {
      startDate: tempStartDate.toISOString(),
      endDate: tempEndDate.toISOString()
    };
  }

  initializeMTDDTO(): MonthToDateReportingDto {
    return {
      shop: '',
      salesNo: 0,
      salesTo: 0,
      salesMg: 0,
      salesMgAvg: 0,
      discountRateAvg: 0,
      date: new Date()
    };
  }

  initializeDRDTO(): DailyReportingDto[] {
    return [{
      shop: 'shop1',
      salesNo: 0,
      salesTo: 0,
      purchCo: 0,
      listPr: 0,
      salesMg: 0,
      salesMgAvg: 0,
      discountRateAvg: 0,
      date: new Date()
    }];
  }

  ngOnInit(): void {
  }
}
