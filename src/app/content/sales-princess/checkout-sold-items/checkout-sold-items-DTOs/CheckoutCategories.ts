import {CheckoutTableItems} from "./CheckoutTableItems";

export interface CheckoutCategories {
  position: number;
  category: string;
  priceListPerUnit: number;
  quantity: number;
  items: CheckoutTableItems[];
}
