import {Component, Input, OnInit} from '@angular/core';
import {ManagerDashboardService} from '../../dashboard-overview/manager-dashboard.service';
import {DateRangeDTO} from '../../../manager-king-dtos/DateRangeDTO';
import {BarDataDto} from '../../../manager-king-dtos/BarDataDto';
import {TRANSLOCO_SCOPE, TranslocoService} from '@ngneat/transloco';


@Component({
  selector: 'app-weekly-performance-chart-card',
  templateUrl: './weekly-performance-card.component.html',
  styleUrls: ['./weekly-performance-card.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: {scope: 'managerKing', alias: 'translate'}}]
})
export class WeeklyPerformanceCardComponent implements OnInit {

  @Input() label: string;
  @Input() total: string;
  @Input() percentage: string;

  // ngx-charts:
  vbarData = [];

  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = '';
  showYAxisLabel = false;
  yAxisLabel = '';
  timeline = true;
  showLabels = false;
  colorScheme = {
    domain: ['#8B0000', '#B22222', '#CD5C5C', '#F08080', '#FA8072', '#FFA07A', '#E9967A']
  };



  constructor(private managerDashboardService: ManagerDashboardService, private translocoService: TranslocoService) {
    this.managerDashboardService.fetchVBarData(this.createChartDates())
      .subscribe((vbarData) => {this.vbarData = vbarData; });
  }

  createChartDates(): DateRangeDTO {
    const intermediateDate = new Date();
    const tempYear = intermediateDate.getFullYear();
    const tempMonth = intermediateDate.getMonth();
    const tempDay = intermediateDate.getDate();
    const tempStartDate = new Date(tempYear, tempMonth, tempDay - 8, 0, 0, 0);
    const tempEndDate = new Date(tempYear, tempMonth, tempDay - 1, 23, 59, 59);
    return {
      startDate: tempStartDate.toISOString(),
      endDate: tempEndDate.toISOString()
    };
  }

  ngOnInit(): void {
    // this.managerDashboardService.fetchVBarData(this.createChartDates())
    //   .subscribe((vbarData) => {this.vbarData = vbarData; });
  }

}
