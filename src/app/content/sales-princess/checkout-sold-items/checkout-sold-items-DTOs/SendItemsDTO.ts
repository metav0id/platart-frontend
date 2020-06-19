import {ShopsCheckoutSoldItemsDTO} from './ShopsCheckoutSoldItemsDTO';

export interface SendItemsDTO {
  sendSoldItemsVerification: boolean;
  sendSoldItemsList: ShopsCheckoutSoldItemsDTO[];
}
