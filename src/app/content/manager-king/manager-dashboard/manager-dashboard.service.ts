import { Injectable } from '@angular/core';
import {MonthToDateReportingDto} from '../manager-king-dtos/MonthToDateReportingDto';
import {DATA} from './mock-data';
import {DailyReportingDto} from '../manager-king-dtos/DailyReportingDto';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerDashboardService {

  // todo: Mock-data! Remove before production

  data = DATA;

  constructor(private http: HttpClient) { }

  // get data for vertical bar-chart: Last week's aggregated turnover

  fetchVBarData(): object[] {
    return [{name: 'mon', value: 1870}, {name: 'tue', value: 2344}, {name: 'wed', value: 1766}, {name: 'thu', value: 1800},
      {name: 'fri', value: 1666}, {name: 'sat', value: 1920}, {name: 'sun', value: 1545}, ];
  }

  // fetchVBarData(): Observable<BarDataDTO[]> {
  //   return this.http.post<BarDataDTO[]>(environment.vBarDataURL, null);
  // }

  // get data for horizontal bar-chart: Last day's turnover by shops

  fetchHBarData(): object[] {
    return [{name: 'shop1', value: 340}, {name: 'shop2', value: 223}, {name: 'shop3', value: 413}, {name: 'shop4', value: 491}];
  }

  // fetchHBarData(): Observable<BarDataDTO[]> {
  //   return this.http.post<BarDataDTO[]>(environment.hBarDataURL, null);
  // }

  // get data for main table: Corresponding aggregated month-to-date numbers from previous month

  fetchDataLastMonth(): MonthToDateReportingDto {
    return {shop: 'all', salesNo: 419, salesTo: 6822, salesMg: 1540, salesMgAvg: 5.09,
      discountRateAvg: 13.0, month: 'April', year: '2020'};
  }

  // fetchDataLastMonth(): Observable<MonthToDateReportingDto> {
  //   return this.http.post<MonthToDateReportingDto>(environment.dataLastMonthURL, null);
  // }

  // get data for main table: Aggregated month-to-date actuals

  fetchDataCurrentMonth(): MonthToDateReportingDto {
    return {shop: 'all', salesNo: 321, salesTo: 5467, salesMg: 1190, salesMgAvg: 5.13,
      discountRateAvg: 12.7, month: 'May', year: '2020'};
  }

  // fetchDataCurrentMonth(): Observable<MonthToDateReportingDto> {
  //   return this.http.post<MonthToDateReportingDto>(environment.dataCurrentMonthURL, null);
  // }

  // get data for gauge-charts: Yesterdays' data

  fetchYesterdaysData(): DailyReportingDto {
    return this.data[DATA.length - 1];
  }

  // fetchYesterdaysData(): Observable<DailyReportingDto> {
  //   return this.http.post<DailyReportingDto>(environment.yesterdaysDataURL, null);
  // }

  // get data for main table: Daily performance (shops aggregated)

  fetchActuals(): DailyReportingDto[] {
    return this.data;
  }

  // fetchActuals(): Observable<DailyReportingDto[]> {
  //   return this.http.post<DailyReportingDto>(environment.actualsDataURL, null);
  // }

  // todo: Correct implementation to select proper colour-set for bar-charts. Not yet working as intended

  getColors(itemCount: number) {
    const colours = ['#8B0000', '#B22222', '#CD5C5C', '#F08080', '#FA8072', '#FFA07A', '#E9967A'];
    // tslint:disable-next-line:prefer-const
    let colourset: string[];
    for (let i = 0; i < itemCount; i++) {
      colourset[i] = colours[i];
    }
    return colourset.reverse();
  }
}


