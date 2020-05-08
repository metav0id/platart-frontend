export interface ShopCheckInNewItemsDTO {
  identifierOnDeliveryList: number;
  shop: string;
  category: string;
  quantity: number;
  priceListPerUnit: number;
  priceSalesPerUnit: number;
  originalQuantity: number;
  timestamp: string;
  comment: string;
}
