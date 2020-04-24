import { Component, OnInit } from '@angular/core';
import {TRANSLOCO_SCOPE, TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: 'header'}]
})
export class HeaderComponent implements OnInit {

  constructor(private transloco: TranslocoService) {}

  public setActiveLang(lang: string) {
    this.transloco.setActiveLang(lang);
  }

  ngOnInit(): void {
  }

}
