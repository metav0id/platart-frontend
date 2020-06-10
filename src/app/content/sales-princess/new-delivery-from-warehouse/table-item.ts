export interface TableItem {
  isChecked: boolean;
  identifierOnDeliveryList: number;
  category: string;
  quantity: number;
  originalQuantity: number;
  priceListPerUnit: number;
  priceSalesPerUnit: number;
  timestamp: string;
  comment: string;
  instructionComment?: string;
}
