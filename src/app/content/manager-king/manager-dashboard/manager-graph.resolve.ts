import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BarDataDto} from '../manager-king-dtos/BarDataDto';
import {ManagerDashboardService} from './manager-dashboard.service';
import {Observable} from 'rxjs';
import {DateRangeDTO} from '../manager-king-dtos/DateRangeDTO';

@Injectable()
export class ManagerGraphResolve implements Resolve<BarDataDto>{

  constructor(private managerDashboardService: ManagerDashboardService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    // return this.managerDashboardService.fetchVBarData(route.queryParams[DateRangeDTO]);
    return null;
  }
}
