import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {MatTable} from "@angular/material/table";
import {WarehouseItemCategoryDTO} from "../../warehouse-queen/warehouseCategory/warehouse-item-category-DTO";
import {FormControl, Validators} from "@angular/forms";
import {CheckoutSoldItemsService} from "./checkout-sold-items.service";
import {CheckoutTableItems} from "./checkout-sold-items-DTOs/CheckoutTableItems";
import {ShopDropDownItem} from "./checkout-sold-items-DTOs/ShopDropDownItem";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CheckoutSoldItemsDetailsComponent} from "./checkout-sold-items-details/checkout-sold-items-details.component";
import {CheckoutTableCategoryItems} from "./checkout-sold-items-DTOs/CheckoutTableCategoryItems";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-checkout-sold-items',
  templateUrl: './checkout-sold-items.component.html',
  styleUrls: ['./checkout-sold-items.component.css']
})
export class CheckoutSoldItemsComponent implements OnInit {

  // Fields for input-form
  public discountMethod: string;
  private readonly DISCOUNT_METHOD_PERCENT = 'percent';
  private readonly DISCOUNT_METHOD_DISPLAY_PRICE = 'displayPrice';
  private readonly DISCOUNT_METHOD_NO_DISCOUNT = 'noDiscount';
  private readonly DISCOUNT_METHOD_OTHER = 'other';
  public discountMethodList: string[] = [ this.DISCOUNT_METHOD_PERCENT , this.DISCOUNT_METHOD_DISPLAY_PRICE, this.DISCOUNT_METHOD_NO_DISCOUNT, this.DISCOUNT_METHOD_OTHER];

  private readonly COMMENT_YES_NECESSARY = 'Comment';
  private readonly COMMENT_NO_NECESSARY = 'No Comment';
  public commentNecessaryList: string[] = [this.COMMENT_YES_NECESSARY, this.COMMENT_NO_NECESSARY];
  public commentNessesary: string = this.COMMENT_NO_NECESSARY;

  private readonly INITIALIZE_CATEGORY = 'chooseCategory';
  private readonly INITIALIZE_SHOP = 'chooseShop';

  // Fields for input-form - Drop-Down-Selection
  /** Shop selection */
  public shopControll = new FormControl('', Validators.required)
  public shopsList: ShopDropDownItem[] = [
    {name: 'shop1'},
    {name: 'shop2'},
    {name: 'shop3'},
    {name: 'shop4'}
  ];

  /** Category selection */
  public categoryControl = new FormControl('', Validators.required);
  public categoryItems: WarehouseItemCategoryDTO[] = [];

  // fields for table
  displayedColumns: string[] = ['position', 'sale'];
  private totalCost: number;
  private totalItems: number;
  public listNewItemsToShops: CheckoutTableItems[] = [];
  public listNewItemsCategories: CheckoutTableCategoryItems[] = [];
  availableItems: number = 0;
  selection = new SelectionModel<CheckoutTableItems>(true, []);
  newCheckoutItem: CheckoutTableItems;

  @ViewChild('myShopCheckoutProductsTable') table: MatTable<any>;
  constructor(/*private _snackBar: MatSnackBar,*/
              private checkoutSoldItemsService: CheckoutSoldItemsService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initNewOrderElement();
    this.fetchCategories();
  }

  fetchCategories(): void{
    this.checkoutSoldItemsService.getAllCategories().subscribe(JsonDto =>{
      this.categoryItems = JsonDto;
    });
  }

  initNewOrderElement(): void {
    this.newCheckoutItem = {
      position: 0,
      category: this.INITIALIZE_CATEGORY,
      quantity: 0,
      priceListPerUnit: 0,
      priceSalesPerUnit: 0,
      discountPercent: 0,
      shop: this.INITIALIZE_SHOP,
      deliverySending: null,
      itemLastSold: null,
      comment: null
    }
  }

  loremIpsumMethod() {
    console.log('implement loremIpsumMethod!')

    // Simple message.
    //let snackBarRef =  this._snackBar.open('Sale send!','ok',{duration: 2000,});
    //this.checkoutSoldItemsService.getAllItemsAllShops();
  }

  addSoldItem() {
    let newSoldItemForTable: CheckoutTableItems ={
      position: this.newCheckoutItem.position,
      category: this.newCheckoutItem.category,
      quantity: this.newCheckoutItem.quantity,
      priceListPerUnit: this.newCheckoutItem.priceListPerUnit,
      priceSalesPerUnit: this.newCheckoutItem.priceSalesPerUnit,
      discountPercent: this.newCheckoutItem.discountPercent,
      shop: this.newCheckoutItem.shop,
      deliverySending: this.newCheckoutItem.deliverySending,
      itemLastSold: this.newCheckoutItem.itemLastSold,
      comment: this.newCheckoutItem.comment,
    }
    this.listNewItemsToShops.push(newSoldItemForTable);
    console.log(this.listNewItemsToShops);

    // update listNewItemsCategories
    this.listNewItemsCategories = this.updateListNewItemsCategories();
    //console.log(this.listNewItemsCategories);

    this.table.renderRows();
  }

  updateListNewItemsCategories(): CheckoutTableCategoryItems[] {
    let newTableItems: CheckoutTableCategoryItems[] = [];
    let positionCounter: number = 0;

    for(let tableItem of this.listNewItemsToShops) {

      let newItemForTable: CheckoutTableCategoryItems = {
        position: positionCounter,
        category: tableItem.category,
        quantity: tableItem.quantity,
        priceListPerUnit: tableItem.priceListPerUnit,
      }

      if(newTableItems.length === 0){
        newTableItems.push(newItemForTable);
        positionCounter++;
      } else {
        let createNewCategory: boolean = true;

        for(let newCategotyItem of newTableItems){
          if(newCategotyItem.category === newItemForTable.category && newCategotyItem.priceListPerUnit === newItemForTable.priceListPerUnit) {
            //update quantity, if createNewCategory has not been updated yet
            if(createNewCategory === true){
              console.log('amount will be updated once');
              newCategotyItem.quantity = Number(newCategotyItem.quantity) + Number(newItemForTable.quantity);
            }

            createNewCategory = false;
          }
        }

        if(createNewCategory === true){
          newTableItems.push(newItemForTable);
          positionCounter++;
        }
      }
    }

    console.log(newTableItems);
    return newTableItems;
  }

  // Date input
  eventsTime: string[] = [];
  dateSelection($event: MatDatepickerInputEvent<Date>) {
    let newDate: Date = $event.value;
    this.newCheckoutItem.itemLastSold = newDate.toISOString();
    this.eventsTime.push( newDate.toISOString() );
    console.log(this.eventsTime);
  }

  // Dialog Popup
  animal: string;
  name: string;

  openDialog(element: CheckoutTableItems): void {
    console.log(element);

    const dialogRef = this.dialog.open(CheckoutSoldItemsDetailsComponent, {
      width: '250px',
      data: this.listNewItemsToShops
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}
