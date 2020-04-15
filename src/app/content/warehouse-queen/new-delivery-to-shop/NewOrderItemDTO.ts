export interface NewOrderItemDTO {
  id: number;
  category: string;
  deliveryQuantity: number;
  deliveryDisplayPricePerUnit: number;
  deliveryDiscount: number;
  deliveryFinalPricePerUnit: number;
  deliveryShop: string;
}
