export interface ShopsCurrentInventoryDTO {
  id: number;
  category: string;
  itemQuantity: number;
  itemFinalPricePerUnit: number;
  itemDisplayPricePerUnit: number;
  itemDiscount: number;
  itemInShop: string;
  itemLastDelivery: string;
  itemLastSold: string;
}
