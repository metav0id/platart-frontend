import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatTable} from '@angular/material/table';
import {NewOrderItemDTO} from './new-delivery-to-shop-DTOs/NewOrderItemDTO';
import {NewDeliveryToShopService} from './new-delivery-to-shop.service';
import {WarehouseItemCategoryDTO} from '../../services/warehouse-item-category-DTO';
import {Observable} from 'rxjs';
import {WarehouseNewDeliveryPersistanceResponseDTO} from './new-delivery-to-shop-DTOs/WarehouseNewDeliveryPersistanceResponseDTO';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {TooltipPosition} from '@angular/material/tooltip';
import {MatDialog} from '@angular/material/dialog';
import {CommentDialogComponent} from './comment-dialog/comment-dialog.component';
import {CategoryService} from '../../services/category.service';
import {AuthService} from '../../services/auth.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-new-delivery-order',
  templateUrl: './new-delivery-to-shop.component.html',
  styleUrls: ['./new-delivery-to-shop.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: {scope: 'warehouseQueen', alias: 'translate'}}]
})
export class NewDeliveryToShopComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  displayedColumns: string[] = ['select', 'category', 'priceListPerUnit', 'quantity',
    'discountPercent', 'priceSalesPerUnit', 'comment', 'updateItem'];
  public listNewItemsToShops: NewOrderItemDTO[] = [];
  public categoryItems: WarehouseItemCategoryDTO[] = [];

  public discountMethod: string;
  readonly DISCOUNT_METHOD_PERCENT = 'percent';
  readonly DISCOUNT_METHOD_DISPLAY_PRICE = 'sales price';
  public discountMethodList: string[] = [this.DISCOUNT_METHOD_PERCENT, this.DISCOUNT_METHOD_DISPLAY_PRICE];
  private readonly INITIALIZE_CATEGORY = 'chooseCategory';
  private readonly INITIALIZE_SHOP = 'chooseShop';

  public shopsList: string[] = [];
  private totalCost: number;
  private totalItems: number;

  newOrderElement: NewOrderItemDTO = {
    id: 0,
    category: this.INITIALIZE_CATEGORY,
    quantity: 0,
    priceSalesPerUnit: 0,
    discountPercent: 0,
    priceListPerUnit: 0,
    deliveryShop: this.INITIALIZE_SHOP,
    comment: ''
  };

  /** Category selection */
  public categoryControl = new FormControl('', Validators.required);

  /** Shop selection */
  public shopControl = new FormControl('', Validators.required);

  availableItems = 0;
  @ViewChild('myShopCheckinProductsTable') table: MatTable<any>;

  constructor(private newDeliveryToShopService: NewDeliveryToShopService,
              private categoryService: CategoryService,
              private dialog: MatDialog,
              private auth: AuthService) {
  }

  ngOnInit(): void {
    this.shopsList = this.auth.getStoresList();
    this.fetchCategoyItems();
    this.fetchNewOrderData();
  }

  fetchNewOrderData(): void {
    Swal.showLoading();
    this.newDeliveryToShopService.getAllNewOrderItems().subscribe(
      JsonDto => {
        JsonDto.forEach(obj => obj.isChecked = false);
        this.listNewItemsToShops = JsonDto;
        this.table.renderRows();
        Swal.close();
      });
  }

  fetchCategoyItems(): void {
    this.categoryService.getAllActivatedCategories().subscribe(JsonDto => {
      this.categoryItems = JsonDto;
    });
  }

  setNewItemOrder() {
    Swal.showLoading();
    this.verifyAvailabilityObservale().subscribe(obs => {
      this.availableItems = obs;

      if (this.availableItems >= this.newOrderElement.quantity) {
        if (this.newOrderElement.priceListPerUnit > 0 &&
          this.newOrderElement.category !== this.INITIALIZE_CATEGORY &&
          this.newOrderElement.quantity > 0 &&
          this.newOrderElement.deliveryShop !== this.INITIALIZE_SHOP) {

          const newItem: NewOrderItemDTO = {
            id: 0,
            category: this.newOrderElement.category,
            quantity: this.newOrderElement.quantity,
            priceSalesPerUnit: this.newOrderElement.priceSalesPerUnit,
            discountPercent: this.newOrderElement.discountPercent,
            priceListPerUnit: this.newOrderElement.priceListPerUnit,
            deliveryShop: this.newOrderElement.deliveryShop,
            comment: this.newOrderElement.comment
          };

          if (this.discountMethod === undefined) {
            newItem.priceSalesPerUnit = newItem.priceListPerUnit;
          } else if (this.discountMethod === this.DISCOUNT_METHOD_DISPLAY_PRICE) {
            newItem.discountPercent = Math.round((1 - (newItem.priceSalesPerUnit / newItem.priceListPerUnit)) * 10000) / 100;
          } else if (this.discountMethod === this.DISCOUNT_METHOD_PERCENT) {
            newItem.priceSalesPerUnit = Math.round(newItem.priceListPerUnit * (1 - newItem.discountPercent / 100) * 100) / 100;
          }
          this.listNewItemsToShops.push(newItem);
          this.saveCurrentOrder(this.listNewItemsToShops);
        }
      }
    });
  }

  verifyAvailabilityObservale(): Observable<number> {
    return new Observable((observer) => {
      let localAvailableItems = 0;

      this.newDeliveryToShopService.verifyAmountItemsOnStock(
        this.newOrderElement.category,
        this.newOrderElement.quantity,
        this.newOrderElement.priceListPerUnit)
        .subscribe(JsonDto => {
          localAvailableItems = JsonDto.quantity;

          for (const orderElem of this.listNewItemsToShops) {
            if (orderElem.category === this.newOrderElement.category &&
              orderElem.priceListPerUnit === this.newOrderElement.priceListPerUnit) {
              localAvailableItems -= orderElem.quantity;
            }
          }
          observer.next(localAvailableItems);
        });
    });
  }

  verifyAvailability() {
    // update the amount of items on stock
    this.newDeliveryToShopService.verifyAmountItemsOnStock(
      this.newOrderElement.category,
      this.newOrderElement.quantity,
      this.newOrderElement.priceListPerUnit)
      .subscribe(JsonDto => {
        this.availableItems = JsonDto.quantity;

        for (const orderElem of this.listNewItemsToShops) {
          if (orderElem.category === this.newOrderElement.category &&
            orderElem.priceListPerUnit === this.newOrderElement.priceListPerUnit) {
            this.availableItems -= orderElem.quantity;
          }
        }
      });
  }

  getTotalValue(): number {
    let totalCost = 0;
    for (const orderElem of this.listNewItemsToShops) {
      totalCost += orderElem.quantity * orderElem.priceListPerUnit;
    }
    return totalCost;
  }

  getTotalItems(): number {
    let totalItems = 0;
    for (const orderElem of this.listNewItemsToShops) {
      totalItems += Number(orderElem.quantity);
    }
    return totalItems;
  }

  saveCurrentOrder(listNewItemsToShops: NewOrderItemDTO[]) {
    this.newDeliveryToShopService.setAllNewOrderItems(listNewItemsToShops).subscribe(result => {
      Swal.close();
      Swal.fire(
        'Success',
        'Successfully added item to list.', //messageSuccessSaving
        'success'
      );
      this.fetchNewOrderData();
    });
  }

  clearCurrentOrder() {
    Swal.showLoading();
    const table: number[] = [];
    this.listNewItemsToShops.filter(obj => obj.isChecked).forEach(obj => table.push(obj.id));
    this.newDeliveryToShopService.removeItems(table).subscribe(result => {
      this.fetchNewOrderData();
      if (result) {
        Swal.fire(
          'Success',
          'Deleted successfully', //messageSuccessSaving
          'success'
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Could not deleted. Please try again.' //messageErrorSaving
        });
      }
    });
  }

  updateButton(item: NewOrderItemDTO) {
    this.newOrderElement.category = item.category;
    this.newOrderElement.quantity = item.quantity;
    this.newOrderElement.priceSalesPerUnit = item.priceSalesPerUnit;
    this.newOrderElement.discountPercent = item.discountPercent;
    this.newOrderElement.priceListPerUnit = item.priceListPerUnit;
    this.newOrderElement.deliveryShop = item.deliveryShop;
    this.newOrderElement.comment = item.comment;
    Swal.showLoading();
    this.newDeliveryToShopService.removeItems([item.id]).subscribe(obj => {
      Swal.close();
      Swal.fire(
        'Edit',
        'Deleted successfully', //messageSuccessSaving
        'success'
      );
      this.fetchNewOrderData();
    });
  }


  sendCurrentOrder() {
    let persistanceResponseList: WarehouseNewDeliveryPersistanceResponseDTO;
    Swal.showLoading();
    this.newDeliveryToShopService.sendFinalizedOrder(this.listNewItemsToShops).subscribe(observer => {
      persistanceResponseList = observer;
      this.fetchNewOrderData();
      Swal.close();
      Swal.fire(
        'Success',
        'List saved', //messageSuccessSaving
        'success'
      );
    });
  }

  openDialogComment(element: NewOrderItemDTO) {
    this.dialog.open(CommentDialogComponent, {
      width: '400px',
      data: element
    });
  }

  selectItem(element: NewOrderItemDTO): void {
    element.isChecked = !element.isChecked;
  }
}
