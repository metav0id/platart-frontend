import {Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTable} from '@angular/material/table';
import {WarehouseItemCategoryDTO} from '../../warehouse-queen/warehouseCategory/warehouse-item-category-DTO';
import {FormControl, Validators} from '@angular/forms';
import {CheckoutSoldItemsService} from './checkout-sold-items.service';
import {ShopsCheckoutSoldItemsDTO} from './checkout-sold-items-DTOs/ShopsCheckoutSoldItemsDTO';
import {Shop} from './checkout-sold-items-DTOs/Shop';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MatDialog} from '@angular/material/dialog';
import {CheckoutSoldItemsDetailsComponent} from './checkout-sold-items-details/checkout-sold-items-details.component';
import {CheckoutCategories} from './checkout-sold-items-DTOs/CheckoutCategories';
import {CheckoutSoldItemsSendVerificationComponent} from './checkout-sold-items-send-verification/checkout-sold-items-send-verification.component';
import {observable} from 'rxjs';

@Component({
  selector: 'app-checkout-sold-items',
  templateUrl: './checkout-sold-items.component.html',
  styleUrls: ['./checkout-sold-items.component.css']
})
export class CheckoutSoldItemsComponent implements OnInit {
  constructor(/*private _snackBar: MatSnackBar,*/
              private checkoutSoldItemsService: CheckoutSoldItemsService,
              public dialog: MatDialog) { }

  // Fields for input-form
  public discountControll = new FormControl('', Validators.required);

  private readonly DISCOUNT_METHOD_PERCENT = 'percent';
  private readonly DISCOUNT_METHOD_REVENUE = 'revenue per item';
  private readonly DISCOUNT_METHOD_NO_DISCOUNT = 'no discount';
  public discountType: string = this.DISCOUNT_METHOD_NO_DISCOUNT;
  public discountList: Shop[] = [
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
  public shopsList: Shop[] = [{name: 'shop1'}, {name: 'shop2'}];

  /** Category selection */
  public categoryControl = new FormControl('', Validators.required);
  public categoryItems: WarehouseItemCategoryDTO[] = [];
  // fields for table
  displayedColumns: string[] = ['sale'];

  private totalAmountSold: number;
  private totalItems: number;
  public soldItemsToShopsList: ShopsCheckoutSoldItemsDTO[] = [];
  public soldItemsCategoryLists: CheckoutCategories[] = [];
  selection = new SelectionModel<ShopsCheckoutSoldItemsDTO>(true, []);
  newCheckoutSoldItem: ShopsCheckoutSoldItemsDTO;

  @ViewChild('myShopCheckoutProductsTable') table: MatTable<any>;

  // Date input
  eventsTime: string[] = [];

  // fields for amount of items
  availableItems = 0;

  ngOnInit(): void {
    this.initNewOrderElement();

    // fetch saved sold items-list
    this.loadSoldItemList();

    // drop-down-lists
    this.checkoutSoldItemsService.getListShops().subscribe(JSON => this.shopsList = JSON);
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.checkoutSoldItemsService.getAllCategories().subscribe(JsonDto => {
      this.categoryItems = JsonDto;
    });
  }

  // un
  initNewOrderElement(): void {
    this.newCheckoutSoldItem = {
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
    };
  }

  // Check! ->
  addSoldItem() {
    // do if values of this.newCheckoutItem are valid
    if ( this.newCheckoutSoldItem.quantity > 0 &&
        this.newCheckoutSoldItem.quantity < 1000 &&
        this.newCheckoutSoldItem.priceListPerUnit > 0 &&
        this.newCheckoutSoldItem.priceSalesPerUnit > 0 &&
        this.newCheckoutSoldItem.category !== null &&
        this.newCheckoutSoldItem.itemLastSold !== null
    ) {

      let revenueCalculation = 0;
      let discountPercentCalculation = 0;
      if (this.discountType === this.DISCOUNT_METHOD_PERCENT ) {
        discountPercentCalculation = this.newCheckoutSoldItem.discountPercent;
        revenueCalculation = this.newCheckoutSoldItem.priceListPerUnit * (100 - this.newCheckoutSoldItem.discountPercent) / 100;
      } else if ( this.discountType === this.DISCOUNT_METHOD_REVENUE ) {
        revenueCalculation = this.newCheckoutSoldItem.revenuePerUnit;
        discountPercentCalculation = 100 - (this.newCheckoutSoldItem.revenuePerUnit * 100 / this.newCheckoutSoldItem.priceListPerUnit);
      } else if ( this.discountType === this.DISCOUNT_METHOD_NO_DISCOUNT) {
        revenueCalculation = this.newCheckoutSoldItem.priceListPerUnit;
        discountPercentCalculation = this.newCheckoutSoldItem.discountPercent;
      }

      let commentBefore: string;
      if (this.commentNessesary === 'No Comment') {
        commentBefore = 'No Comment';
      } else {
        commentBefore = this.newCheckoutSoldItem.comment;
      }

      const newSoldItemForTable: ShopsCheckoutSoldItemsDTO = {
        position: this.newCheckoutSoldItem.position,
        category: this.newCheckoutSoldItem.category,
        quantity: this.newCheckoutSoldItem.quantity,
        priceListPerUnit: this.newCheckoutSoldItem.priceListPerUnit,
        priceSalesPerUnit: this.newCheckoutSoldItem.priceSalesPerUnit,
        revenuePerUnit: revenueCalculation,
        discountPercent: discountPercentCalculation,
        shop: this.newCheckoutSoldItem.shop,
        deliverySending: this.newCheckoutSoldItem.deliverySending,
        itemLastSold: this.newCheckoutSoldItem.itemLastSold,
        comment: commentBefore,
      };
      this.soldItemsToShopsList.push(newSoldItemForTable);
      // this.saveSoldItemList();
      console.log('soldItemsToShopsList');
      console.log(this.soldItemsToShopsList);

      this.rebuildListCategories();
      this.rebuildListCategories();
      //this.table.renderRows();

      // update listNewItemsCategories
      /*if (this.soldItemsCategoryLists.length === 0) {
        this.rebuildListCategories();
      } else {
        for ( const categoryItem of this.soldItemsCategoryLists) {
          if ( categoryItem.category === newSoldItemForTable.category &&
              categoryItem.priceListPerUnit === newSoldItemForTable.priceListPerUnit &&
              categoryItem.priceSalesPerUnit === newSoldItemForTable.priceSalesPerUnit
            ) {

            const newItem: ShopsCheckoutSoldItemsDTO = {
              position: newSoldItemForTable.position,
              category: newSoldItemForTable.category,
              quantity: newSoldItemForTable.quantity,
              priceListPerUnit: newSoldItemForTable.priceListPerUnit,
              priceSalesPerUnit: newSoldItemForTable.priceSalesPerUnit,
              revenuePerUnit: newSoldItemForTable.revenuePerUnit,
              discountPercent: newSoldItemForTable.discountPercent,
              shop: newSoldItemForTable.shop,
              deliverySending: newSoldItemForTable.deliverySending,
              itemLastSold: newSoldItemForTable.itemLastSold,
              comment: newSoldItemForTable.comment
            };
            categoryItem.quantity += Number(newItem.quantity);
            categoryItem.items.push(newItem);
          }
        }
      }*/
    } else {
      console.log('item can not be added, since its fields are unvalid.');
    }
    this.table.renderRows();
    console.log(this.soldItemsCategoryLists);
  }

  updateListCategories(): void {

  }

  // Check! ->
  rebuildListCategories(): void {
    console.log('rebuildListCategories -> soldItemsToShopsList:');
    console.log(this.soldItemsToShopsList);

    let positionCounter = 0;
    const newCategoryLists: CheckoutCategories[] = [];

    // only create categories
    for (const item of this.soldItemsToShopsList) {
      const newCategory: CheckoutCategories = {
        position: positionCounter,
        category: item.category,
        priceListPerUnit: item.priceListPerUnit,
        priceSalesPerUnit: item.priceSalesPerUnit,
        quantity: 0,
        items: []
      };

      if (newCategoryLists.length === 0) {
        newCategoryLists.push(newCategory);
      } else {
        let createNewCategoryFlag = true;

        // check if category already exists
        for (const categoryItem of newCategoryLists) {
          if ( categoryItem.category == newCategory.category &&
              categoryItem.priceListPerUnit == newCategory.priceListPerUnit &&
              categoryItem.priceSalesPerUnit == newCategory.priceSalesPerUnit
          ) {
            createNewCategoryFlag = false;
          }
        }

        // create new category
        if (createNewCategoryFlag) {
          newCategoryLists.push(newCategory);
          positionCounter++;
        }
      }
    }

    // Add items by category
    for (const categoryItem of newCategoryLists) {
      for (const item of this.soldItemsToShopsList) {
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
        if ( categoryItem.category == newItem.category &&
            categoryItem.priceListPerUnit == newItem.priceListPerUnit &&
            categoryItem.priceSalesPerUnit == newItem.priceSalesPerUnit
        ) {
          categoryItem.quantity += Number(newItem.quantity);
          categoryItem.items.push(newItem);
        }
      }
    }
    this.soldItemsCategoryLists = newCategoryLists;
    console.log('rebuildListCategories -> soldItemsCategoryLists:');
    console.log(this.soldItemsCategoryLists);
    this.table.renderRows();
  }

  // un
  dateSelection($event: MatDatepickerInputEvent<Date>) {
    const newDate: Date = $event.value;
    this.newCheckoutSoldItem.itemLastSold = newDate.toISOString();
    this.eventsTime.push( newDate.toISOString() );
  }

  // CHECK! -> subscribe or not
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

  // un
  // updates the category list and renders table
  updateAmountListCategories(): void {
    for (const item of this.soldItemsCategoryLists) {
      let newQuantity = 0;
      for (const subItem of item.items) {
        newQuantity += Number(subItem.quantity);
      }
      item.quantity = newQuantity;

      // remove category if empty
      if (item.quantity === 0) {
        const indexItem: number = this.soldItemsCategoryLists.indexOf(item);
        this.soldItemsCategoryLists.splice(indexItem, 1);
      }
    }
  }

  // un
  // update the listNewItemsToShops from updated category list
  updateListNewItemsToShops(): void {
    // reset the listNewItemsToShops list
    this.soldItemsToShopsList = [];

    // refill with category items
    for (const categoryItem of this.soldItemsCategoryLists) {
      for (const item of categoryItem.items) {
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
        this.soldItemsToShopsList.push(newItem);
      }
    }
  }

  // un
  saveSoldItemList() {
    console.log('implement saving sold items list');
    this.checkoutSoldItemsService.saveAllSoldItemsList(this.soldItemsToShopsList).subscribe();
  }

  // un
  sendSoldItemList() {
    console.log('implement sending sold items list');

    // open dialoge window
    const dialogRef = this.dialog.open(CheckoutSoldItemsSendVerificationComponent, {
      width: '250px',
      data: this.soldItemsToShopsList
    });

    // once confirmed, send delivery order
    dialogRef.afterClosed().subscribe(() => {
      this.checkoutSoldItemsService.sendAllSoldItemsList(this.soldItemsToShopsList).subscribe(JsonDto => {
          console.log(JsonDto);

          this.soldItemsToShopsList = JsonDto;
          this.rebuildListCategories();
        }
      );
    });
  }

  // un
  deleteSoldItemList() {
    console.log('implement deleting sold items list');
    this.checkoutSoldItemsService.deleteCurrentSoldItemsList().subscribe();
  }

  // Un
  loadSoldItemList() {
    console.log('implement loading sold items list');
    this.checkoutSoldItemsService.getAllSoldItemsList().subscribe( JsonDto => {
      this.soldItemsToShopsList = JsonDto;
      this.rebuildListCategories();
      this.table.renderRows();
    }
  );
  }

  // checked
  verifyAvailability(newItem: ShopsCheckoutSoldItemsDTO) {
    console.log('implement verifyAvailability for :');
    const verifyCategory: boolean = newItem.category !== null && newItem.category !== 'chooseCategory';
    const verifyShop: boolean = newItem.shop !== null && newItem.shop !== 'chooseShop';
    const verifyPriceListPerUnit: boolean = newItem.priceListPerUnit !== null && newItem.priceListPerUnit > 0;
    const verifyPriceSalesPerUnit: boolean = newItem.priceSalesPerUnit !== null && newItem.priceSalesPerUnit > 0;

    if (verifyCategory &&
        verifyShop &&
        verifyPriceListPerUnit &&
        verifyPriceSalesPerUnit ) {
      console.log('entered into the if');
      this.checkoutSoldItemsService.verifyAvailability(newItem).subscribe((observable) => {
        console.log(observable);
        this.availableItems = observable.quantity;
      });
    } else {
      console.log('New Item not fully defined');
    }

  }

}
