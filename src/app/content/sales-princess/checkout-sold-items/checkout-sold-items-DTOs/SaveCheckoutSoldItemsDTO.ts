import {ShopsCheckoutSoldItemsDTO} from './ShopsCheckoutSoldItemsDTO';

export interface SaveCheckoutSoldItemsDTO {
  shop: string;
  itemsDTOList: ShopsCheckoutSoldItemsDTO[];
}
