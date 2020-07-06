import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {TooltipPosition} from '@angular/material/tooltip';
import {ActivatedRoute, Router} from '@angular/router';
import {ManagerDashboardService} from '../dashboard-overview/manager-dashboard.service';
import {DateRangeDTO} from '../../manager-king-dtos/DateRangeDTO';
import {TRANSLOCO_SCOPE, TranslocoService} from '@ngneat/transloco';
import {domtoimage} from 'dom-to-image';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import {PdfsaverService} from '../../../services/pdfsaver.service';

@Component({
  selector: 'app-manager-dashboard-category',
  templateUrl: './manager-dashboard-category.component.html',
  styleUrls: ['./manager-dashboard-category.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: {scope: 'managerKing', alias: 'translate'}}]
})
export class ManagerDashboardCategoryComponent implements OnInit {

  startDate;
  endDate;
  maxDate;
  minDate;
  range: DateRangeDTO;
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  // ngx-charts-attributes

  barData = [];
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
    domain: this.managerDashboardService.getColors()
  };


  constructor(private managerDashboardService: ManagerDashboardService, private translocoService: TranslocoService,
              private route: ActivatedRoute, private router: Router, private pdfsaverService: PdfsaverService) {
    const tempYear = new Date().getFullYear();
    const tempMonth = new Date().getMonth();
    const tempDay = new Date().getDate();
    this.startDate = new FormControl(new Date(tempYear, tempMonth, tempDay - 15, 23, 59, 59));
    this.endDate = new FormControl(new Date(tempYear, tempMonth, tempDay - 1, 23, 59, 59));
    this.maxDate = new Date();
    this.minDate = this.maxDate;
    this.range = this.createDefaultChartDates();
    this.managerDashboardService.fetchCategoryData(this.range)
      .subscribe((barData) => {
        this.barData = barData;
      });
  }

  ngOnInit(): void {
  }

  refreshCategoryGraph() {
    this.managerDashboardService.fetchCategoryData(this.range)
      .subscribe((barData) => {
        this.barData = barData;
      });
  }

  startDateSelection($event: MatDatepickerInputEvent<Date>) {
    this.range.startDate = $event.value.toISOString();
  }

  endDateSelection($event: MatDatepickerInputEvent<Date>) {
    this.range.endDate = $event.value.toISOString();
  }

  createDefaultChartDates(): DateRangeDTO {
    const intermediateDate = new Date();
    const tempYear = intermediateDate.getFullYear();
    const tempMonth = intermediateDate.getMonth();
    const tempDay = intermediateDate.getDate();
    const tempStartDate = new Date(tempYear, tempMonth, tempDay - 15, 0, 0, 0);
    const tempEndDate = new Date(tempYear, tempMonth, tempDay - 1, 23, 59, 59);
    return {
      startDate: tempStartDate.toISOString(),
      endDate: tempEndDate.toISOString()
    };
  }

  exportAsPDF(page: string) {
    const data = document.getElementById('printable');
    this.pdfsaverService.saveScreenToPDF(data, page);
  }
}
