export interface ShopsCurrentInventoryDTO {
  id: number;
  category: string;
  quantity: number;
  priceListPerUnit: number;
  priceSalesPerUnit: number;
  discountPercent: number;
  shop: string;
  deliverySending: string;
  itemLastSold: string;
}
