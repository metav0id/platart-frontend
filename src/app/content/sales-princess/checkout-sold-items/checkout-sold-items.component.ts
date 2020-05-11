import {Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {MatTable} from "@angular/material/table";
import {WarehouseItemCategoryDTO} from "../../warehouse-queen/warehouseCategory/warehouse-item-category-DTO";
import {FormControl, Validators} from "@angular/forms";
import {CheckoutSoldItemsService} from "./checkout-sold-items.service";
import {ShopsCheckoutSoldItemsDTO} from "./checkout-sold-items-DTOs/ShopsCheckoutSoldItemsDTO";
import {DropDownItem} from "./checkout-sold-items-DTOs/DropDownItem";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {MatDialog} from "@angular/material/dialog";
import {CheckoutSoldItemsDetailsComponent} from "./checkout-sold-items-details/checkout-sold-items-details.component";
import {CheckoutCategories} from "./checkout-sold-items-DTOs/CheckoutCategories";
import {CheckoutSoldItemsSendVerificationComponent} from "./checkout-sold-items-send-verification/checkout-sold-items-send-verification.component";

@Component({
  selector: 'app-checkout-sold-items',
  templateUrl: './checkout-sold-items.component.html',
  styleUrls: ['./checkout-sold-items.component.css']
})
export class CheckoutSoldItemsComponent implements OnInit {

  // Fields for input-form
  public discountControll = new FormControl('', Validators.required);

  private readonly DISCOUNT_METHOD_PERCENT = 'percent';
  private readonly DISCOUNT_METHOD_REVENUE = 'revenue';
  private readonly DISCOUNT_METHOD_NO_DISCOUNT = 'no discount';
  public discountType: string = this.DISCOUNT_METHOD_NO_DISCOUNT;
  public discountList: DropDownItem[] = [
    {name: this.DISCOUNT_METHOD_PERCENT},
    {name: this.DISCOUNT_METHOD_REVENUE},
    {name: this.DISCOUNT_METHOD_NO_DISCOUNT},
  ];


  private readonly COMMENT_YES_NECESSARY = 'Comment';
  private readonly COMMENT_NO_NECESSARY = 'No Comment';
  public commentNecessaryList: string[] = [this.COMMENT_YES_NECESSARY, this.COMMENT_NO_NECESSARY];
  public commentNessesary: string = this.COMMENT_NO_NECESSARY;

  private readonly INITIALIZE_CATEGORY = 'chooseCategory';
  private readonly INITIALIZE_SHOP = 'chooseShop';

  // Fields for input-form - Drop-Down-Selection
  /** Shop selection */
  public shopControll = new FormControl('', Validators.required);
  public shopsList: DropDownItem[] = [
    {name: 'shop1'},
    {name: 'shop2'},
    {name: 'shop3'},
    {name: 'shop4'}
  ];

  /** Category selection */
  public categoryControl = new FormControl('', Validators.required);
  public categoryItems: WarehouseItemCategoryDTO[] = [];
  // fields for table
  displayedColumns: string[] = ['sale'];

  private totalAmountSold: number;
  private totalItems: number;
  public listNewItemsToShops: ShopsCheckoutSoldItemsDTO[] = [];
  public categoryLists: CheckoutCategories[] = [];
  availableItems: number = 0;
  selection = new SelectionModel<ShopsCheckoutSoldItemsDTO>(true, []);
  newCheckoutItem: ShopsCheckoutSoldItemsDTO;

  @ViewChild('myShopCheckoutProductsTable') table: MatTable<any>;
  constructor(/*private _snackBar: MatSnackBar,*/
              private checkoutSoldItemsService: CheckoutSoldItemsService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadSoldItemList();
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
      revenuePerUnit: 0,
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

    // do if values of this.newCheckoutItem are valid
    if( this.newCheckoutItem.quantity>0 &&
        this.newCheckoutItem.quantity<100 &&
        this.newCheckoutItem.priceListPerUnit>0 &&
        this.newCheckoutItem.priceSalesPerUnit>0 &&
        this.newCheckoutItem.category !== null &&
        this.newCheckoutItem.itemLastSold !== null
    ){

      let revenueCalculation: number = 0;
      let discountPercentCalculation: number = 0;
      if(this.discountType === this.DISCOUNT_METHOD_PERCENT ) {
        discountPercentCalculation = this.newCheckoutItem.discountPercent;
        revenueCalculation = this.newCheckoutItem.priceListPerUnit * (100-this.newCheckoutItem.discountPercent)/100;
      } else if ( this.discountType === this.DISCOUNT_METHOD_REVENUE ) {
        revenueCalculation = this.newCheckoutItem.revenuePerUnit;
        discountPercentCalculation = 100 - (this.newCheckoutItem.revenuePerUnit * 100 / this.newCheckoutItem.priceListPerUnit);
      } else if ( this.discountType === this.DISCOUNT_METHOD_NO_DISCOUNT) {
        revenueCalculation = this.newCheckoutItem.priceListPerUnit;
        discountPercentCalculation = this.newCheckoutItem.discountPercent;
      }

      let commentBefore: string;
      if(this.commentNessesary === "No Comment"){
        commentBefore = "No Comment";
      } else {
        commentBefore = this.newCheckoutItem.comment;
      }

      let newSoldItemForTable: ShopsCheckoutSoldItemsDTO ={
        position: this.newCheckoutItem.position,
        category: this.newCheckoutItem.category,
        quantity: this.newCheckoutItem.quantity,
        priceListPerUnit: this.newCheckoutItem.priceListPerUnit,
        priceSalesPerUnit: this.newCheckoutItem.priceSalesPerUnit,
        revenuePerUnit: revenueCalculation,
        discountPercent: discountPercentCalculation,
        shop: this.newCheckoutItem.shop,
        deliverySending: this.newCheckoutItem.deliverySending,
        itemLastSold: this.newCheckoutItem.itemLastSold,
        comment: commentBefore,
      };

      this.listNewItemsToShops.push(newSoldItemForTable);
      console.log(this.listNewItemsToShops);

      // update listNewItemsCategories
      this.rebuildListCategories();
      this.table.renderRows();
    } else {
      console.log('item can not be added, since its fields are unvalid.')
    }
  }

  rebuildListCategories(): void {
    let positionCounter: number = 0;
    let newCategoryLists: CheckoutCategories[] = [];

    // create categories
    for(let item of this.listNewItemsToShops){
      let newCategory: CheckoutCategories = {
        position: positionCounter,
        category: item.category,
        priceListPerUnit: item.priceListPerUnit,
        quantity: 0,
        items: []
      };

      if(newCategoryLists.length === 0){
        newCategoryLists.push(newCategory);
      } else {
        let createNewCategoryFlag: boolean = true;

        // check if category already exists
        for(let categoryItem of newCategoryLists){
          if( categoryItem.category === newCategory.category &&
              categoryItem.priceListPerUnit === newCategory.priceListPerUnit) {
            createNewCategoryFlag = false;
          }
        }

        // create new category
        if(createNewCategoryFlag){
          newCategoryLists.push(newCategory);
          positionCounter++;
        }
      }
    }

    // Add items by category
    for(let categoryItem of newCategoryLists){
      for(let item of this.listNewItemsToShops){
        const newItem: ShopsCheckoutSoldItemsDTO = {
          position: item.position,
          category: item.category,
          quantity: item.quantity,
          priceListPerUnit: item.priceListPerUnit,
          priceSalesPerUnit: item.priceSalesPerUnit,
          revenuePerUnit: item.revenuePerUnit,
          discountPercent: item.discountPercent,
          shop: item.shop,
          deliverySending: item.deliverySending,
          itemLastSold: item.itemLastSold,
          comment: item.comment
        };
        if( categoryItem.category === newItem.category &&
            categoryItem.priceListPerUnit === categoryItem.priceListPerUnit){
          categoryItem.quantity += Number(newItem.quantity);
          categoryItem.items.push(newItem);
        }
      }
    }
    this.categoryLists = newCategoryLists;
    console.log('new Categories Json:');
    console.log(this.categoryLists);
  }

  // Date input
  eventsTime: string[] = [];
  dateSelection($event: MatDatepickerInputEvent<Date>) {
    let newDate: Date = $event.value;
    this.newCheckoutItem.itemLastSold = newDate.toISOString();
    this.eventsTime.push( newDate.toISOString() );
  }

  openDialogCategory(checkoutCategory: CheckoutCategories) {
    console.log('open category Dialog');
    // open the dialogue
    const dialogRef = this.dialog.open(CheckoutSoldItemsDetailsComponent, {
      width: '250px',
      data: checkoutCategory.items
    });

    // listNewItemsCategories and render table, once dialoge is closed
    dialogRef.afterClosed().subscribe(() => {
      this.updateAmountListCategories();
      this.table.renderRows();
      this.updateListNewItemsToShops();
    });
  }

  // updates the category list and renders table
  updateAmountListCategories(): void {
    for(let item of this.categoryLists){
      let newQuantity: number = 0;
      for(let subItem of item.items){
        newQuantity += Number(subItem.quantity);
      }
      item.quantity = newQuantity;

      // remove category if empty
      if(item.quantity === 0){
        const indexItem: number = this.categoryLists.indexOf(item);
        this.categoryLists.splice(indexItem, 1);
      }
    }
  }

  // update the listNewItemsToShops from updated category list
  updateListNewItemsToShops(): void {
    // reset the listNewItemsToShops list
    this.listNewItemsToShops = [];

    // refill with category items
    for(let categoryItem of this.categoryLists){
      for(let item of categoryItem.items){
        const newItem: ShopsCheckoutSoldItemsDTO = {
          position: item.position,
          category: item.category,
          quantity: item.quantity,
          priceListPerUnit: item.priceListPerUnit,
          priceSalesPerUnit: item.priceSalesPerUnit,
          revenuePerUnit: item.revenuePerUnit,
          discountPercent: item.discountPercent,
          shop: item.shop,
          deliverySending: item.deliverySending,
          itemLastSold: item.itemLastSold,
          comment: item.comment
        };
        this.listNewItemsToShops.push(newItem);
      }
    }
  }

  saveSoldItemList() {
    console.log('implement saving sold items list');
    this.checkoutSoldItemsService.saveAllSoldItemsList(this.listNewItemsToShops).subscribe();
  }

  sendSoldItemList() {
    console.log('implement sending sold items list');

    // open dialoge window
    const dialogRef = this.dialog.open(CheckoutSoldItemsSendVerificationComponent, {
      width: '250px',
      data: this.listNewItemsToShops
    });

    // once confirmed, send delivery order
    dialogRef.afterClosed().subscribe(() => {
      this.checkoutSoldItemsService.sendAllSoldItemsList(this.listNewItemsToShops).subscribe( JsonDto => {
          console.log(JsonDto);

          this.listNewItemsToShops = JsonDto;
          this.rebuildListCategories();
        }
      );
    });
  }

  deleteSoldItemList() {
    console.log('implement deleting sold items list');
    this.checkoutSoldItemsService.deleteCurrentSoldItemsList().subscribe();
  }

  loadSoldItemList() {
    console.log('implement loading sold items list');
    this.checkoutSoldItemsService.getAllSoldItemsList().subscribe( JsonDto => {
      this.listNewItemsToShops = JsonDto;
      this.rebuildListCategories();
    }
  );
  }
}
