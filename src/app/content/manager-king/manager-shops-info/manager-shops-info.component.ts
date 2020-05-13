import { Component, OnInit } from '@angular/core';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {FormControl, Validators} from "@angular/forms";
import {Shop} from "./manager-shops-info-DTOs/Shop";
import {ManagerShopsInfoService} from "./manager-shops-info.service";

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

  constructor(private managerShopsInfoService: ManagerShopsInfoService) { }

  ngOnInit(): void {
    this.managerShopsInfoService.getListShops().subscribe( (JsonDto) => {
      this.listShops = JsonDto;
    } );
  }

  getDeliveryItemList(selectedShopToFilterOnList: string) {
    console.log(selectedShopToFilterOnList);
  }
}
