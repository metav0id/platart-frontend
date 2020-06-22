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
// tslint:disable-next-line:max-line-length
import {CheckoutSoldItemsSendVerificationComponent} from './checkout-sold-items-send-verification/checkout-sold-items-send-verification.component';
import {SendItemsDTO} from './checkout-sold-items-DTOs/Send-Items-DTO';
import {TRANSLOCO_SCOPE, TranslocoService} from '@ngneat/transloco';
import {TooltipPosition} from '@angular/material/tooltip';
import Swal from 'sweetalert2';
import {AuthService} from '../../services/auth.service';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {observable} from "rxjs";

@Component({
  selector: 'app-checkout-sold-items',
  templateUrl: './checkout-sold-items.component.html',
  styleUrls: ['./checkout-sold-items.component.css'],
  providers: [
    {provide: TRANSLOCO_SCOPE, useValue: {scope: 'salesPrincess', alias: 'translate'}},
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class CheckoutSoldItemsComponent implements OnInit {
  public listShops1: string[] = new Array();
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  constructor(/*private _snackBar: MatSnackBar,*/
              private checkoutSoldItemsService: CheckoutSoldItemsService,
              private transloco: TranslocoService,
              public dialog: MatDialog,
              private auth: AuthService) {
  }

  // Fields for input-form
  public discountControll = new FormControl('', Validators.required);

  public selectedShopName = '';
  public selectedShopBoolean: boolean = false;

  public readonly DISCOUNT_METHOD_REVENUE = 'special price';
  public readonly DISCOUNT_METHOD_NO_DISCOUNT = 'no extra discount';
  public discountType: string = this.DISCOUNT_METHOD_NO_DISCOUNT;
  public discountList: Shop[] = [
    {name: this.DISCOUNT_METHOD_REVENUE},
    {name: this.DISCOUNT_METHOD_NO_DISCOUNT},
  ];
  public discountNessesary: string = this.DISCOUNT_METHOD_NO_DISCOUNT;


  private readonly COMMENT_YES_NECESSARY = 'Comment';
  private readonly COMMENT_NO_NECESSARY = 'No Comment';
  public commentNecessaryList: string[] = [this.COMMENT_YES_NECESSARY, this.COMMENT_NO_NECESSARY];
  public commentNessesary: string = this.COMMENT_NO_NECESSARY;

  private readonly INITIALIZE_CATEGORY = 'chooseCategory';
  private readonly INITIALIZE_SHOP = 'chooseShop';

  // Fields for input-form - Drop-Down-Selection
  /** Shop selection */
  public shopControll = new FormControl('', Validators.required);
  public shopsList: Shop[] = [];

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
    this.listShops1 = this.auth.getStoresList();
    this.initNewOrderElement();

    // fetch saved sold items-list
    // this.loadSoldItemList();

    // drop-down-lists
    this.checkoutSoldItemsService.getListShops().subscribe(JSON => this.shopsList = JSON);
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.checkoutSoldItemsService.getAllCategories().subscribe(JsonDto => {
      this.categoryItems = JsonDto;
    });
  }

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

  addSoldItem() {

    // compute amount of available items of given category
    this.verifyAvailability(this.newCheckoutSoldItem);

    const verifyAmountAvailable: boolean = Number(this.availableItems) >= Number(this.newCheckoutSoldItem.quantity);
    // do if values of this.newCheckoutItem are valid
    const verifyQuantity: boolean = this.newCheckoutSoldItem.quantity > 0 && this.newCheckoutSoldItem.quantity < 1000;
    const verifyPriceListPerUnit: boolean = this.newCheckoutSoldItem.priceListPerUnit > 0 && this.newCheckoutSoldItem.priceSalesPerUnit > 0;
    const verifyCategory: boolean = this.newCheckoutSoldItem.category !== null && this.newCheckoutSoldItem.itemLastSold !== null;
    if (verifyAmountAvailable &&
      verifyQuantity &&
      verifyPriceListPerUnit &&
      verifyCategory
    ) {

      let revenueCalculation = 0;
      let discountPercentCalculation = 0;
      if (this.discountType === this.DISCOUNT_METHOD_REVENUE) {
        revenueCalculation = this.newCheckoutSoldItem.revenuePerUnit;
        discountPercentCalculation = 100 - (this.newCheckoutSoldItem.revenuePerUnit * 100 / this.newCheckoutSoldItem.priceListPerUnit);
      } else if (this.discountType === this.DISCOUNT_METHOD_NO_DISCOUNT) {
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
        shop: this.selectedShopName,
        deliverySending: this.newCheckoutSoldItem.deliverySending,
        itemLastSold: this.newCheckoutSoldItem.itemLastSold,
        comment: commentBefore,
      };

      this.soldItemsToShopsList.push(newSoldItemForTable);
      this.rebuildListCategories();

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Entered data Error',
        text: 'Entered data are invalid, please try again or check stock to make sure the information is correct.'
      });
    }
    this.table.renderRows();

    // save sold items
    this.saveSoldItemList();
  }

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
          // tslint:disable-next-line:triple-equals
          if (categoryItem.category == newCategory.category &&
            // tslint:disable-next-line:triple-equals
            categoryItem.priceListPerUnit == newCategory.priceListPerUnit &&
            // tslint:disable-next-line:triple-equals
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
        if (
          // tslint:disable-next-line:triple-equals
          categoryItem.category == newItem.category &&
          // tslint:disable-next-line:triple-equals
          categoryItem.priceListPerUnit == newItem.priceListPerUnit &&
          // tslint:disable-next-line:triple-equals
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

  dateSelection($event: MatDatepickerInputEvent<Date>) {
    const newDate: Date = $event.value;
    this.newCheckoutSoldItem.itemLastSold = newDate.toISOString();
    this.eventsTime.push(newDate.toISOString());
  }

  openDialogCategory(checkoutCategory: CheckoutCategories) {
    console.log('open category Dialog');
    // open the dialogue
    const dialogRef = this.dialog.open(CheckoutSoldItemsDetailsComponent, {
      width: '400px',
      data: checkoutCategory.items
    });

    // listNewItemsCategories and render table, once dialoge is closed
    dialogRef.afterClosed().subscribe(() => {
      this.updateAmountListCategories();
      this.table.renderRows();
      this.updateListNewItemsToShops();
      this.saveSoldItemList();
    });
  }

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

  saveSoldItemList() {
    this.checkoutSoldItemsService.saveSpecificShopSoldItemsList(this.selectedShopName, this.soldItemsToShopsList).subscribe();
  }

  sendSoldItemList() {
    console.log('implement sending sold items list');

    const sendSoldItemsData: SendItemsDTO = {
      sendSoldItemsVerification: false,
      sendSoldItemsList: this.soldItemsToShopsList
    };

    // open dialoge window
    const dialogRef = this.dialog.open(CheckoutSoldItemsSendVerificationComponent, {
      width: '250px',
      data: sendSoldItemsData
    });

    // once confirmed, send delivery order
    dialogRef.afterClosed().subscribe((DataObservable) => {
      console.log(sendSoldItemsData);

      if (sendSoldItemsData.sendSoldItemsVerification === true) {
        console.log('Send items');
        this.checkoutSoldItemsService.sendSpecificShopSoldItemsList(
          this.selectedShopName,
          this.soldItemsToShopsList).subscribe((JsonDto) => {
            this.soldItemsToShopsList = [];
            this.rebuildListCategories();
          }
        );
      }
    });
  }

  deleteSoldItemList() {
    this.checkoutSoldItemsService.deleteShopSpecificCheckoutSoldItemsList(this.selectedShopName).subscribe((observable)=>{
      this.soldItemsToShopsList = [];
      this.rebuildListCategories();
      this.table.renderRows();
    });
  }

  loadSoldItemList() {
    if (this.selectedShopBoolean) {
      this.checkoutSoldItemsService.getSpecificShopSoldItemsList(this.selectedShopName).subscribe(JsonDto => {
          this.soldItemsToShopsList = JsonDto;
          this.rebuildListCategories();
          this.table.renderRows();
        }
      );
    }
  }

  verifyAvailability(newItem: ShopsCheckoutSoldItemsDTO) {
    console.log(newItem);
    const verifyCategory: boolean = newItem.category !== null && newItem.category !== 'chooseCategory';
    const verifyShop: boolean = newItem.shop !== null && newItem.shop !== 'chooseShop';
    const verifyPriceListPerUnit: boolean = newItem.priceListPerUnit !== null && newItem.priceListPerUnit > 0;
    const verifyPriceSalesPerUnit: boolean = newItem.priceSalesPerUnit !== null && newItem.priceSalesPerUnit > 0;

    if (verifyCategory &&
      verifyShop &&
      verifyPriceListPerUnit &&
      verifyPriceSalesPerUnit) {
      console.log('entered into the if');
      this.checkoutSoldItemsService.verifyAvailability(newItem).subscribe((observable) => {
        this.availableItems = observable.quantity;

        for (const item of this.soldItemsToShopsList) {
          // tslint:disable-next-line:triple-equals no-shadowed-variable
          const verifyShop: boolean = (this.selectedShopName == item.shop);
          // tslint:disable-next-line:triple-equals no-shadowed-variable
          const verifyPriceListPerUnit: boolean = (this.newCheckoutSoldItem.priceListPerUnit == item.priceListPerUnit);
          // tslint:disable-next-line:triple-equals no-shadowed-variable
          const verifyPriceSalesPerUnit: boolean = (this.newCheckoutSoldItem.priceSalesPerUnit == item.priceSalesPerUnit);
          // tslint:disable-next-line:triple-equals no-shadowed-variable
          const verifyCategory: boolean = (this.newCheckoutSoldItem.category == item.category);

          if (verifyShop && verifyPriceListPerUnit && verifyPriceSalesPerUnit && verifyCategory) {
            this.availableItems -= Number(item.quantity);
          }
        }
      });
    } else {
      console.log('New Item not fully defined');
    }
  }

  getSpecificShopList() {
    if (this.selectedShopName !== '') {
      this.selectedShopBoolean = true;
      this.newCheckoutSoldItem.shop = this.selectedShopName;

      this.loadSoldItemList();
    }
  }

}
