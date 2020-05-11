import {ShopsCheckoutSoldItemsDTO} from "./ShopsCheckoutSoldItemsDTO";

export interface CheckoutCategories {
  position: number;
  category: string;
  priceListPerUnit: number;
  quantity: number;
  items: ShopsCheckoutSoldItemsDTO[];
}
