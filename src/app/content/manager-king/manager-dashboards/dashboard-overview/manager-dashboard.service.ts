import {Injectable} from '@angular/core';
import {MonthToDateReportingDto} from '../../manager-king-dtos/MonthToDateReportingDto';
import {DailyReportingDto} from '../../manager-king-dtos/DailyReportingDto';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BarDataDto} from '../../manager-king-dtos/BarDataDto';
import {environment} from '../../../../../environments/environment';
import {DateRangeDTO} from '../../manager-king-dtos/DateRangeDTO';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManagerDashboardService {

  constructor(private http: HttpClient) {
  }

  // get data for vertical bar-chart: Last week's aggregated turnover

  fetchTurnoverOverviewData(range: DateRangeDTO): Observable<BarDataDto[]> {
    return this.http.post<BarDataDto[]>(environment.getTurnoverByDate, range).pipe(delay(1000));
  }

  // get data for horizontal bar-chart: Last day's turnover by shops

  fetchShopPerformanceData(range: DateRangeDTO): Observable<BarDataDto[]> {
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

  fetchYesterdaysData(range: DateRangeDTO): Observable<MonthToDateReportingDto> {
    return this.http.post<MonthToDateReportingDto>(environment.getAggregatedDataForPeriod, range).pipe(delay(1000));
  }

  // get data for main table: Daily performance (shops aggregated)

 fetchActuals(range: DateRangeDTO): Observable<DailyReportingDto[]> {
    return this.http.post<DailyReportingDto[]>(environment.getDailyDataForPeriod, range).pipe(delay(1000));
  }

  // get data for category ranking-dashboard

  fetchCategoryData(range: DateRangeDTO): Observable<BarDataDto[]> {
    return this.http.post<BarDataDto[]>(environment.getCategoryDataURL, range).pipe(delay(1000));
  }

  // get predefined colour-palette for charts

  getColors() {
    const colourset: string[] = ['#ffebe6', '#ffd6cc', '#ffc2b3', '#ffad99', '#ff9980', '#ff8566', '#ff704d',
      '#ff5c33', '#ff471a', '#ff5c33', '#ff3300', '#e62e00', '#cc2900', '#b32400', '#991f00', '#801a00',
      '#661400', '#4d0f00', '#330a00'];
    return colourset.reverse();
  }
}


