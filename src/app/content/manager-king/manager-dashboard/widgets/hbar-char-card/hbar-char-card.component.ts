import {Component, Input, OnInit} from '@angular/core';
import {ManagerDashboardService} from '../../manager-dashboard.service';
import {DateRangeDTO} from '../../../manager-king-dtos/DateRangeDTO';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-hbar-char-card',
  templateUrl: './hbar-char-card.component.html',
  styleUrls: ['./hbar-char-card.component.css']
})
export class HbarCharCardComponent implements OnInit {

  @Input() label: string;
  @Input() total: string;
  @Input() percentage: string;
  startDate;
  endDate;
  tempDate;
  maxDate: Date;
  minDate: Date;
  hbarData;

  constructor(private managerDashboardService: ManagerDashboardService) {
    this.endDate = new FormControl(new Date());
    this.tempDate = new Date();
    this.tempDate.setDate(this.tempDate.getDate() - 14);
    this.startDate = new FormControl(this.tempDate);
    this.maxDate = new Date();
    this.minDate = this.maxDate;

    const range: DateRangeDTO = {
      endDate: new Date().toISOString(),
      startDate: this.tempDate.toISOString()
    };
    this.managerDashboardService.fetchHBarData(this.createChartDates())
      .subscribe((hbarData) => {this.hbarData = hbarData; });
  }

  // ngx-charts:

  data = this.hbarData;
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
