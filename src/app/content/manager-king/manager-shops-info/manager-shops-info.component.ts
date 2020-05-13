import { Component, OnInit } from '@angular/core';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';

@Component({
  selector: 'app-manage-shops-info',
  templateUrl: './manager-shops-info.component.html',
  styleUrls: ['./manager-shops-info.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: { scope: 'managerKing/manageShopsInfo', alias: 'translate' }}]
})
export class ManagerShopsInfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
