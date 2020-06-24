export interface ShopsAllSoldItemsDTO {
  id: number;

  category: string;
  quantity: number;
  priceListPerUnit: number;
  priceSalesPerUnit: number;
  revenuePerUnit: number;
  discountPercent: number;
  shop: string;
  deliverySending: string;
  itemLastSold: string;
  comment: string;
}
