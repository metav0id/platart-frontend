import {Component, Input, OnInit} from '@angular/core';
import {ManagerDashboardService} from '../../manager-dashboard.service';
import {DateRangeDTO} from '../../../manager-king-dtos/DateRangeDTO';
import {BarDataDto} from '../../../manager-king-dtos/BarDataDto';


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



  constructor(private managerDashboardService: ManagerDashboardService) {
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
