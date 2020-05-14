export interface DeliveryItemFromWarehouseDTO {
  /** Is used for table elements */
  identifierOnDeliveryList: number;
  category: string;
  quantity: number;
  originalQuantity: number;
  priceListPerUnit: number;
  priceSalesPerUnit: number;
  timestamp: string;
  comment: string;
}
