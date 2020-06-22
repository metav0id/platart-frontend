import {Injectable} from '@angular/core';
import {MonthToDateReportingDto} from '../manager-king-dtos/MonthToDateReportingDto';
import {DailyReportingDto} from '../manager-king-dtos/DailyReportingDto';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BarDataDto} from '../manager-king-dtos/BarDataDto';
import {environment} from '../../../../environments/environment';
import {DateRangeDTO} from '../manager-king-dtos/DateRangeDTO';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManagerDashboardService {

  constructor(private http: HttpClient) {
  }

  // get data for vertical bar-chart: Last week's aggregated turnover


  fetchVBarData(range: DateRangeDTO): Observable<BarDataDto[]> {
    return this.http.post<BarDataDto[]>(environment.getTurnoverByDate, range).pipe(delay(1000));
  }

  // get data for horizontal bar-chart: Last day's turnover by shops

  fetchHBarData(range: DateRangeDTO): Observable<BarDataDto[]> {
    return this.http.post<BarDataDto[]>(environment.getTurnoverByShopURL, range).pipe(delay(1000));
  }

  // get data for main table: Corresponding aggregated month-to-date numbers from previous month

  fetchDataLastMonth(range: DateRangeDTO): Observable<MonthToDateReportingDto> {
    return this.http.post<MonthToDateReportingDto>(environment.getAggregatedDataForPeriod, range).pipe(delay(1000));
  }

  // get data for main table: Aggregated month-to-date actuals

  fetchDataCurrentMonth(range: DateRangeDTO): Observable<MonthToDateReportingDto> {
    return this.http.post<MonthToDateReportingDto>(environment.getAggregatedDataForPeriod, range).pipe(delay(1000));
  }

  // get data for gauge-charts: Yesterdays' data

  fetchYesterdaysData(range: DateRangeDTO): Observable<DailyReportingDto> {
    return this.http.post<DailyReportingDto>(environment.getDailyDataForPeriod, range).pipe(delay(1000));
  }

  // get data for main table: Daily performance (shops aggregated)

 fetchActuals(range: DateRangeDTO): Observable<DailyReportingDto[]> {
    return this.http.post<DailyReportingDto[]>(environment.getDailyDataForPeriod, range).pipe(delay(1000));
  }

  fetchCategoryData(range: DateRangeDTO): Observable<BarDataDto[]> {
    return this.http.post<BarDataDto[]>(environment.getCategoryDataURL, range).pipe(delay(1000));
  }

  // todo: Correct implementation to select proper colour-set for bar-charts. Not yet working as intended



  getColors(itemCount: number) {
    const colours = ['#8B0000', '#B22222', '#CD5C5C', '#F08080', '#FA8072', '#FFA07A', '#E9967A'];
    let colourset: string[];
    for (let i = 0; i < itemCount; i++) {
      colourset[i] = colours[i];
    }
    return colourset.reverse();
  }
}


