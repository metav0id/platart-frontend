export interface NewOrderItemDTO {
  id: number;
  category: string;
  deliveryQuantity: number;
  deliveryPricePerUnit: number;
  deliveryDiscount: number;
  deliveryFinalPricePerUnit: number;
}

//TODO i would write an interface instead of a class. Interfaces are more appropriate for DTOs ;-)
