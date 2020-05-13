import { Component, OnInit } from '@angular/core';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {FormControl, Validators} from "@angular/forms";
import {Shop} from "../../commonDTOs/shop";

@Component({
  selector: 'app-manage-shops-info',
  templateUrl: './manager-shops-info.component.html',
  styleUrls: ['./manager-shops-info.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: { scope: 'managerKing/manageShopsInfo', alias: 'translate' }}]
})
export class ManagerShopsInfoComponent implements OnInit {

  /** Category selection */
  public shopControl = new FormControl('', Validators.required);

  /** List of available shops */
  public listShops: Shop[] = [{name: 'shop1'}, {name: 'shop2'}];
  public selectedShopToFilterOnList = '';
  public selectedShopToDisplay = '';

  constructor() { }

  ngOnInit(): void {
  }

  getDeliveryItemList(selectedShopToFilterOnList: string) {
    console.log(selectedShopToFilterOnList);
  }
}
