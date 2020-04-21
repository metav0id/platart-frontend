import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {SelectionModel} from "@angular/cdk/collections";
import {MatTable} from "@angular/material/table";
import {NewOrderItemDTO} from "./NewOrderItemDTO";
import {NewDeliveryToShopService} from "./new-delivery-to-shop.service";
import {VerifyAmountItemsOnStockDTO} from "./VerifyAmountItemsOnStockDTO";
import {WarehouseItemCategoryDTO} from "../warehouseCategory/warehouse-item-category-DTO";
import {WarehouseCategoryService} from "../warehouseCategory/warehouseCategory.service";
import {NewDeliveryToWarehouseService} from "../new-delivery-to-warehouse/new-delivery-to-warehouse.service";
import {observable, Observable} from "rxjs";
import {WarehouseNewDeliveryPersistanceResponseDTO} from "./WarehouseNewDeliveryPersistanceResponseDTO";

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
  selector: 'app-new-delivery-order',
  templateUrl: './new-delivery-to-shop.component.html',
  styleUrls: ['./new-delivery-to-shop.component.css']
})
export class NewDeliveryToShopComponent implements OnInit {
  displayedColumns: string[] = ['select', 'category', 'deliveryDisplayPricePerUnit', 'deliveryQuantity', 'deliveryDiscount', 'deliveryFinalPricePerUnit', 'updateItem'];
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

  selection = new SelectionModel<PeriodicElement>(true, []);
  /** Category selection */
  public categoryControl = new FormControl('', Validators.required);

  /** Shop selection */
  public shopControll = new FormControl('', Validators.required)

  availableItems: number = 0;
  @ViewChild('myShopCheckinProductsTable') table: MatTable<any>;
  constructor(private newDeliveryToShopService: NewDeliveryToShopService, private warehouseCategoryService: WarehouseCategoryService) {
  }

  ngOnInit(): void {
    this.fetchCategoyItems();
    this.fetchNewOrderData();
  }

  fetchNewOrderData(): void {
    this.newDeliveryToShopService.getAllNewOrderItems().subscribe(
      JsonDto =>
      {
        this.listNewItemsToShops  = [];
        let counter = 0;
        for(const tempNewOrderItemDTO of JsonDto){
          let newPeriodicElement: PeriodicElement  = {
            position: counter,
            category: tempNewOrderItemDTO.category,
            deliveryDiscount: tempNewOrderItemDTO.deliveryDiscount,
            deliveryDisplayPricePerUnit: tempNewOrderItemDTO.deliveryDisplayPricePerUnit,
            deliveryFinalPricePerUnit: tempNewOrderItemDTO.deliveryFinalPricePerUnit,
            deliveryQuantity: tempNewOrderItemDTO.deliveryQuantity,
            deliveryShop: tempNewOrderItemDTO.deliveryShop
          };
          counter++;
          this.listNewItemsToShops.push(newPeriodicElement);
        }
        this.table.renderRows();
      });
  }

  fetchCategoyItems(): void {
    this.warehouseCategoryService.getAllCategories().subscribe(JsonDto =>{ this.categoryItems = JsonDto});
  }

  setNewItemOrder() {
    //this.verifyAvailability();
    console.log('set new Item Value');

    this.verifyAvailabilityObservale().subscribe(obs => {
      this.availableItems = obs;

      console.log( 'obs value' + obs);

      if (this.availableItems >= this.newOrderElement.deliveryQuantity) {

        if (this.newOrderElement.deliveryFinalPricePerUnit > 0 &&
          this.newOrderElement.category !== this.INITIALIZE_CATEGORY &&
          this.newOrderElement.deliveryQuantity > 0 &&
          this.newOrderElement.deliveryShop !== this.INITIALIZE_SHOP &&
          true) {

          const newItem: PeriodicElement = {
            position: this.listNewItemsToShops.length + 1,
            category: this.newOrderElement.category,
            deliveryQuantity: this.newOrderElement.deliveryQuantity,
            deliveryDisplayPricePerUnit: this.newOrderElement.deliveryDisplayPricePerUnit,
            deliveryDiscount: this.newOrderElement.deliveryDiscount,
            deliveryFinalPricePerUnit: this.newOrderElement.deliveryFinalPricePerUnit,
            deliveryShop: this.newOrderElement.deliveryShop
          };

          console.log('before if : discount ' + newItem.deliveryDiscount + ' final price: ' + newItem.deliveryFinalPricePerUnit + ' display price: ' + newItem.deliveryDisplayPricePerUnit)

          console.log('discount method flag:' + this.discountMethod)

          if (this.discountMethod === undefined) {
            newItem.deliveryDisplayPricePerUnit = newItem.deliveryFinalPricePerUnit;
          } else if (this.discountMethod === this.DISCOUNT_METHOD_DISPLAY_PRICE) {
            newItem.deliveryDiscount = Math.round((1 - (newItem.deliveryDisplayPricePerUnit / newItem.deliveryFinalPricePerUnit)) * 100);
          } else if (this.discountMethod === this.DISCOUNT_METHOD_PERCENT) {
            newItem.deliveryDisplayPricePerUnit = Math.round(newItem.deliveryFinalPricePerUnit * (1 - newItem.deliveryDiscount / 100));
          }

          console.log('After If : discount ' + newItem.deliveryDiscount + ' final price: ' + newItem.deliveryFinalPricePerUnit + ' display price: ' + newItem.deliveryDisplayPricePerUnit)

          this.listNewItemsToShops.push(newItem);
          this.table.renderRows();
        }
      }
    });
    this.verifyAvailability();
  }

  getTotalValue(): number {
    this.totalCost = 0;
    for (const orderElem of this.listNewItemsToShops) {
      this.totalCost += orderElem.deliveryQuantity * orderElem.deliveryFinalPricePerUnit;
    }
    return this.totalCost;
  }

  getTotalItems(): number {
    this.totalItems = 0;
    for (const orderElem of this.listNewItemsToShops) {
      this.totalItems += Number( orderElem.deliveryQuantity );
    }
    return this.totalItems;
  }

  saveCurrentOrder() {
    let tempNewOrderItemDTOList: NewOrderItemDTO[] = this.mapPeriodicElementListToDTO();

    this.newDeliveryToShopService.setAllNewOrderItems(tempNewOrderItemDTOList);
    this.table.renderRows();
  }

  mapPeriodicElementListToDTO(): NewOrderItemDTO[] {
    let tempNewOrderItemDTOList: NewOrderItemDTO[] = [];
    for(const tempPeriodicElement of this.listNewItemsToShops) {
      let newOrderItemDTO: NewOrderItemDTO = {
        id: tempPeriodicElement.position,
        category: tempPeriodicElement.category,
        deliveryDiscount: tempPeriodicElement.deliveryDiscount,
        deliveryDisplayPricePerUnit: tempPeriodicElement.deliveryDisplayPricePerUnit,
        deliveryFinalPricePerUnit: tempPeriodicElement.deliveryFinalPricePerUnit,
        deliveryQuantity: tempPeriodicElement.deliveryQuantity,
        deliveryShop: tempPeriodicElement.deliveryShop
      };
      tempNewOrderItemDTOList.push(newOrderItemDTO);
    }
    return tempNewOrderItemDTOList;
  }

  clearCurrentOrder() {
    for(let elem of this.selection.selected){

      let currentIndex: number = elem.position;
      this.removeCurrentItem(currentIndex);
    }
    console.log(this.listNewItemsToShops);
    this.table.renderRows();
  }

  updateButton(periodicElement: PeriodicElement) {
    console.log('print button');
    console.log(periodicElement);
    this.newOrderElement.position = periodicElement.position;
    this.newOrderElement.category = periodicElement.category;
    this.newOrderElement.deliveryQuantity = periodicElement.deliveryQuantity;
    this.newOrderElement.deliveryDisplayPricePerUnit = periodicElement.deliveryDisplayPricePerUnit;
    this.newOrderElement.deliveryDiscount = periodicElement.deliveryDiscount;
    this.newOrderElement.deliveryFinalPricePerUnit = periodicElement.deliveryFinalPricePerUnit;
    this.newOrderElement.deliveryShop = periodicElement.deliveryShop;

    //function to remove the current element
    this.removeCurrentItem(periodicElement.position);
    this.table.renderRows();
  }

  removeCurrentItem(currentIndex: number){
    for (let i = 0; i < this.listNewItemsToShops.length; i++) {
      if (this.listNewItemsToShops[i].position === currentIndex){
        this.listNewItemsToShops.splice(i, 1);
      }
    }
  }

  verifyAvailability() {
    //update the amount of items on stock
    this.newDeliveryToShopService.verifyAmountItemsOnStock(
      this.newOrderElement.category,
      this.newOrderElement.deliveryQuantity,
      this.newOrderElement.deliveryFinalPricePerUnit)
      .subscribe(JsonDto => {
        console.log(JsonDto);
        this.availableItems = JsonDto.quantity;

        for (const orderElem of this.listNewItemsToShops) {
          if(orderElem.category === this.newOrderElement.category && orderElem.deliveryFinalPricePerUnit === this.newOrderElement.deliveryFinalPricePerUnit)
          this.availableItems -= orderElem.deliveryQuantity;
        }
      });
  }

  verifyAvailabilityObservale(): Observable<number> {

    return new Observable( (observer) => {
      let localAvailableItems: number = 0;

      //update the amount of items on stock
      this.newDeliveryToShopService.verifyAmountItemsOnStock(
        this.newOrderElement.category,
        this.newOrderElement.deliveryQuantity,
        this.newOrderElement.deliveryFinalPricePerUnit)
        .subscribe(JsonDto => {
          console.log(JsonDto);
          localAvailableItems = JsonDto.quantity;

          for (const orderElem of this.listNewItemsToShops) {
            if(orderElem.category === this.newOrderElement.category && orderElem.deliveryFinalPricePerUnit === this.newOrderElement.deliveryFinalPricePerUnit)
              localAvailableItems -= orderElem.deliveryQuantity;
          }
          observer.next(localAvailableItems);
        });
    });
  }

  sendCurrentOrder() {
    let tempNewOrderItemDTOList: NewOrderItemDTO[] = this.mapPeriodicElementListToDTO();

    let persistanceResponseList: WarehouseNewDeliveryPersistanceResponseDTO;

    this.newDeliveryToShopService.sendFinalizedOrder(tempNewOrderItemDTOList).subscribe( observer => {
      persistanceResponseList = observer;
      console.log("after everything");
      console.log(persistanceResponseList);

      this.fetchNewOrderData();
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listNewItemsToShops.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      console.log('All lines are selected');
      this.listNewItemsToShops.forEach(row => this.selection.select(row));
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
