import {Component, OnInit, ViewChild} from '@angular/core';
import {NewOrderItemDTO} from "./NewOrderItemDTO";
import {NewDeliveryToShopService} from "./new-delivery-to-shop.service";
import {MatTable} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";

/** Is used for table elements */
export interface PeriodicElement {
  position: number;
  category: string;
  deliveryDisplayPricePerUnit: number;
  deliveryQuantity: number;
  deliveryDiscount: number;
  deliveryFinalPricePerUnit: number;
}

@Component({
  selector: 'app-new-delivery-order',
  templateUrl: './new-delivery-to-shop.component.html',
  styleUrls: ['./new-delivery-to-shop.component.css']
})
export class NewDeliveryToShopComponent implements OnInit {
  displayedColumns: string[] = ['select', 'category', 'deliveryDisplayPricePerUnit', 'deliveryQuantity', 'deliveryDiscount', 'deliveryFinalPricePerUnit'];
  public listNewItemsToShops: PeriodicElement[] = [];
  private totalCost: number;
  private totalItems: number;

  newOrderElement: PeriodicElement = {
    position: 0,
    category: 'chooseCategory',
    deliveryQuantity: 11,
    deliveryDisplayPricePerUnit: 10,
    deliveryDiscount: 20,
    deliveryFinalPricePerUnit: 8
  };

  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild('myShopCheckinProductsTable') table: MatTable<any>;
  constructor(private newDeliveryToShopService: NewDeliveryToShopService) {
  }

  ngOnInit(): void {
    this.fetchNewOrderData();
  }

  fetchNewOrderData(): void {
    this.newDeliveryToShopService.getAllNewOrderItems().subscribe(
      JsonDto =>
      {
        let counter = 0;
        for(const tempNewOrderItemDTO of JsonDto){
          let newPeriodicElement: PeriodicElement  = {
            position: counter,
            category: tempNewOrderItemDTO.category,
            deliveryDiscount: tempNewOrderItemDTO.deliveryDiscount,
            deliveryDisplayPricePerUnit: tempNewOrderItemDTO.deliveryDisplayPricePerUnit,
            deliveryFinalPricePerUnit: tempNewOrderItemDTO.deliveryFinalPricePerUnit,
            deliveryQuantity: tempNewOrderItemDTO.deliveryQuantity
          };
          counter++;
          this.listNewItemsToShops.push(newPeriodicElement);
        }
      });
    this.table.renderRows();
  }

  setNewItemOrder() {
    if (this.newOrderElement.deliveryFinalPricePerUnit > 0 &&
        this.newOrderElement.category !== '' &&
        this.newOrderElement.deliveryQuantity > 0) {

      const newItem: PeriodicElement = {
        position: this.listNewItemsToShops.length +1,
        category: this.newOrderElement.category,
        deliveryQuantity: this.newOrderElement.deliveryQuantity,
        deliveryDisplayPricePerUnit: this.newOrderElement.deliveryDisplayPricePerUnit,
        deliveryDiscount: this.newOrderElement.deliveryDiscount,
        deliveryFinalPricePerUnit: this.newOrderElement.deliveryFinalPricePerUnit
      };
      this.listNewItemsToShops.push(newItem);
      this.table.renderRows();
      console.log(this.listNewItemsToShops);
    }
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
    console.log('Save current order----> implement new functionality!;');
    let tempNewOrderItemDTOList: NewOrderItemDTO[] = [];
    for(const tempPeriodicElement of this.listNewItemsToShops) {
      let newOrderItemDTO: NewOrderItemDTO = {
        id: tempPeriodicElement.position,
        category: tempPeriodicElement.category,
        deliveryDiscount: tempPeriodicElement.deliveryDiscount,
        deliveryDisplayPricePerUnit: tempPeriodicElement.deliveryDisplayPricePerUnit,
        deliveryFinalPricePerUnit: tempPeriodicElement.deliveryFinalPricePerUnit,
        deliveryQuantity: tempPeriodicElement.deliveryQuantity
      };
      tempNewOrderItemDTOList.push(newOrderItemDTO);
    }
    this.newDeliveryToShopService.setAllNewOrderItems(tempNewOrderItemDTOList);
    this.table.renderRows();
  }

  clearCurrentOrder() {
    console.log(this.listNewItemsToShops);
    console.log(this.selection.selected);

    for(let elem of this.selection.selected){
      console.log(elem.position);
      let currentIndex: number = elem.position;
      for (let i = 0; i < this.listNewItemsToShops.length; i++) {
        console.log(this.listNewItemsToShops[i].position);
        if (this.listNewItemsToShops[i].position === currentIndex){
          this.listNewItemsToShops.splice(i, 1);
        }
      }
    }
    this.table.renderRows();
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
