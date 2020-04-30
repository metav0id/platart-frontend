// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  saveCommerce: 'http://localhost:8081/comerce/savecomerce',
  getAllMarkers: 'http://localhost:8081/marker/getallmarkers',
  saveMarker: 'http://localhost:8081/marker/savemarker',
  findCommerce: 'http://localhost:8081/comerce/find',
  findMarker: 'http://localhost:8081/marker/find',
  updateMarker: 'http://localhost:8081/marker/update',
  deleteMarker: 'http://localhost:8081/marker/delete',
  getAllShops: 'http://localhost:8081/shops/getAllItemsAllShops',
  getAllCategories: 'http://localhost:8081/warehouse/getAllCategories',
  getAllNewOrderItems: 'http://localhost:8081/warehouse/getAllNewOrderItems',
  setAllNewOrderItems: 'http://localhost:8081/warehouse/setAllNewOrderItems',
  verifyAmountItemsOnStock: 'http://localhost:8081/warehouse/verifyAmountItemsOnStock',
  saveDeliveryOrder: 'http://localhost:8081/warehouse/sendDeliveryOrder',
  saveListDeliverySupplier: 'http://localhost:8081/warehouse/savelistdeliverysupplier',
  saveNewCategory: 'http://localhost:8081/warehouse/saveNewCategory',
  deleteCategory: 'http://localhost:8081/warehouse/deleteCategory',
  getAllItemsInStock: 'http://localhost:8081/warehouse/getallitems',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
