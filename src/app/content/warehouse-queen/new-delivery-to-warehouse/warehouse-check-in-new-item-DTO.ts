export interface WarehouseCheckInNewItemDTO {
  category: string;
  quantity: number;
  priceListPerUnit: number;
  priceSupplierPerUnit: number;
  supplierName: string;
  isChecked?: boolean;
}
