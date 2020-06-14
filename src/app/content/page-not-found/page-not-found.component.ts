import {Component, OnInit} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  role: String = "Warehouse manager";
  panelOpenState = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
