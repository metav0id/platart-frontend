import {Component, Input, OnInit} from '@angular/core';
import {ManagerDashboardService} from '../../manager-dashboard.service';
import {DateRangeDTO} from '../../../manager-king-dtos/DateRangeDTO';

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

  public hbarData = this.managerDashboardService.fetchHBarData(this.createChartDates());

  constructor(private managerDashboardService: ManagerDashboardService) {
  }

  createChartDates(): DateRangeDTO {
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
