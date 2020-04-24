import { Component, OnInit } from '@angular/core';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';

@Component({
  selector: 'app-manage-shops-info',
  templateUrl: './manage-shops-info.component.html',
  styleUrls: ['./manage-shops-info.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: { scope: 'managerKing/manageShopsInfo', alias: 'translate' }}]
})
export class ManageShopsInfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
