import { Component, OnInit } from '@angular/core';
import {TRANSLOCO_SCOPE, TranslocoService} from '@ngneat/transloco';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: 'header'}]
})
export class HeaderComponent implements OnInit {

  constructor(private transloco: TranslocoService, private auth: AuthService, private router: Router) {}

  public setActiveLang(lang: string) {
    this.transloco.setActiveLang(lang);
  }

  ngOnInit(): void {
  }
  out(){
    this.auth.logOut();
    this.router.navigateByUrl('/login');

  }
}
