import {Component, Input, OnInit} from '@angular/core';
import {ManagerDashboardService} from '../../manager-dashboard.service';
import {DateRangeDTO} from '../../../manager-king-dtos/DateRangeDTO';
import {BarDataDto} from '../../../manager-king-dtos/BarDataDto';

@Component({
  selector: 'app-hbar-char-card',
  templateUrl: './hbar-char-card.component.html',
  styleUrls: ['./hbar-char-card.component.css']
})
export class HbarCharCardComponent implements OnInit {

  @Input() label: string;
  @Input() total: string;
  @Input() percentage: string;

  // ngx-charts:

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

  hbarData;

  constructor(private managerDashboardService: ManagerDashboardService) {
    this.managerDashboardService.fetchHBarData(this.createChartDates())
      .subscribe((hbarData) => {this.hbarData = hbarData; });
  }

  createChartDates(): DateRangeDTO {
    const tempStartDate = new Date();
    tempStartDate.setDate(tempStartDate.getDate() - 1);
    tempStartDate.setHours(0, 0, 0);
    const tempEndDate = new Date();
    tempEndDate.setDate(tempEndDate.getDate() - 1);
    tempEndDate.setHours(23, 59, 59);
    return {
      startDate: tempStartDate.toISOString(),
      endDate: tempEndDate.toISOString()
    };
  }

  ngOnInit(): void {
  }
}
