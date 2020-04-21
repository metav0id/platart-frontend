import {WarehouseItemPersistanceErrorDTO} from "./WarehouseItemPersistanceErrorDTO";

export interface WarehouseNewDeliveryPersistanceResponseDTO {
  persistanceInitialized: boolean;
  persistanceSuccessful: boolean;
  itemPersistanceErrorDtoList: WarehouseItemPersistanceErrorDTO [];
}
