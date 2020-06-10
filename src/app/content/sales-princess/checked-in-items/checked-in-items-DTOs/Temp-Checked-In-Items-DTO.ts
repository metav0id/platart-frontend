export interface TempCheckedInItemsDTO {
  id: number;

  shop: string;
  category: string;
  quantity: number;
  priceSalesPerUnit: number;
  priceListPerUnit: number;
  discountPercent: number;
  deliverySending: string;
}
