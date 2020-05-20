import { Component, OnInit } from '@angular/core';
import {ManagerDashboardService} from './manager-dashboard.service';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {

  // todo: Make view responsive (table already working as intended)

  dataLastMonth = this.managerDashboardService.fetchDataLastMonth();
  dataCurrentMonth = this.managerDashboardService.fetchDataCurrentMonth();
  dataYesterday = this.managerDashboardService.fetchYesterdaysData();
  data = this.managerDashboardService.fetchActuals();

  constructor(private managerDashboardService: ManagerDashboardService) { }

  ngOnInit(): void {
  }
}