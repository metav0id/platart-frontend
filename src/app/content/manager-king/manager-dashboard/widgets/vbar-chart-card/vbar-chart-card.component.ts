import {Component, Input, OnInit} from '@angular/core';
import {ManagerDashboardService} from '../../manager-dashboard.service';
import {DateRangeDTO} from '../../../manager-king-dtos/DateRangeDTO';


@Component({
  selector: 'app-vbar-chart-card',
  templateUrl: './vbar-chart-card.component.html',
  styleUrls: ['./vbar-chart-card.component.css']
})
export class VbarChartCardComponent implements OnInit {

  @Input() label: string;
  @Input() total: string;
  @Input() percentage: string;

  // ngx-charts:
  public vbarData = this.managerDashboardService.fetchVBarData(this.createChartDates());

  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = '';
  showYAxisLabel = false;
  yAxisLabel = '';
  timeline = true;
  colorScheme = {
    domain: ['#8B0000', '#B22222', '#CD5C5C', '#F08080', '#FA8072', '#FFA07A', '#E9967A']
  };

  showLabels = false;

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
