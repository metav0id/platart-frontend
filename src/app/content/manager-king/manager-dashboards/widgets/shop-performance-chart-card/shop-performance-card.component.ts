import {Component, Input, OnInit} from '@angular/core';
import {ManagerDashboardService} from '../../dashboard-overview/manager-dashboard.service';
import {DateRangeDTO} from '../../../manager-king-dtos/DateRangeDTO';
import {TRANSLOCO_SCOPE, TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-shop-performance-card',
  templateUrl: './shop-performance-card.component.html',
  styleUrls: ['./shop-performance-card.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: {scope: 'managerKing', alias: 'translate'}}]
})
export class ShopPerformanceCardComponent implements OnInit {

  @Input() label: string;
  @Input() total: string;
  @Input() percentage: string;

  constructor(private managerDashboardService: ManagerDashboardService, private translocoService: TranslocoService) {
    this.managerDashboardService.fetchShopPerformanceData(this.createChartDates())
      .subscribe((barData) => {this.barData = barData; });
  }

  // ngx-charts attributes:

  barData = [];
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = '';
  showYAxisLabel = false;
  yAxisLabel = '';
  colorScheme = {
    domain: this.managerDashboardService.getColors()
  };

  createChartDates(): DateRangeDTO {
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

  ngOnInit(): void {
  }
}
