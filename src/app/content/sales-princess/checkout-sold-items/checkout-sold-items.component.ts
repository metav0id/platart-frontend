import {Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {MatTable} from "@angular/material/table";
import {WarehouseItemCategoryDTO} from "../../warehouse-queen/warehouseCategory/warehouse-item-category-DTO";
import {FormControl, Validators} from "@angular/forms";
import {MatSnackBar} from '@angular/material/snack-bar';
import {CheckoutSoldItemsService} from "./checkout-sold-items.service";


/** Is used for table elements */
export interface PeriodicElement {
  position: number;
  category: string;
  deliveryDisplayPricePerUnit: number;
  deliveryQuantity: number;
  deliveryDiscount: number;
  deliveryFinalPricePerUnit: number;
  deliveryShop: string;
}

/** Is used for Shops Drop Down */
export interface Shop {
  name: string;
}

@Component({
  selector: 'app-checkout-sold-items',
  templateUrl: './checkout-sold-items.component.html',
  styleUrls: ['./checkout-sold-items.component.css']
})
export class CheckoutSoldItemsComponent implements OnInit {

  public listNewItemsToShops: PeriodicElement[] = [];
  public categoryItems: WarehouseItemCategoryDTO[] = [];

  public discountMethod: string;
  private readonly DISCOUNT_METHOD_PERCENT = 'percent';
  private readonly DISCOUNT_METHOD_DISPLAY_PRICE = 'displayPrice';
  public discountMethodList: string[] = [ this.DISCOUNT_METHOD_PERCENT , this.DISCOUNT_METHOD_DISPLAY_PRICE];
  private readonly INITIALIZE_CATEGORY = 'chooseCategory';
  private readonly INITIALIZE_SHOP = 'chooseShop';

  public shopsList: Shop[] = [
    {name: 'shop1'},
    {name: 'shop2'},
    {name: 'shop3'},
    {name: 'shop4'}
  ];
  private totalCost: number;
  private totalItems: number;

  newOrderElement: PeriodicElement = {
    position: 0,
    category: this.INITIALIZE_CATEGORY,
    deliveryQuantity: 0,
    deliveryDisplayPricePerUnit: 0,
    deliveryDiscount: 0,
    deliveryFinalPricePerUnit: 0,
    deliveryShop: this.INITIALIZE_SHOP
  };

  /** Category selection */
  public categoryControl = new FormControl('', Validators.required);
  /** Shop selection */
  public shopControll = new FormControl('', Validators.required)

  availableItems: number = 0;
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild('myShopCheckinProductsTable') table: MatTable<any>;
  constructor(private _snackBar: MatSnackBar,
              private checkoutSoldItemsService: CheckoutSoldItemsService) { }

  ngOnInit(): void {
  }

  loremIpsumMethod() {
    console.log('implement loremIpsumMethod!')

    // Simple message.
    let snackBarRef =  this._snackBar.open('Sale send!','ok',{duration: 2000,});
    this.checkoutSoldItemsService.getAllItemsAllShops();
  }

}
