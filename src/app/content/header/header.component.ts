import { Component, OnInit } from '@angular/core';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: 'header'}]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
