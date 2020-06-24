export interface NewOrderItemDTO {
  id: number;
  category: string;
  quantity: number;
  priceSalesPerUnit: number;
  discountPercent: number;
  priceListPerUnit: number;
  deliveryShop: string;
  comment: string;
  isChecked?: boolean;
}
