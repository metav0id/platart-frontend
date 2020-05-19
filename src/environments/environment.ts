// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  saveCommerce: 'http://localhost:8081/comerce/savecomerce',
  getAllMarkers: 'http://localhost:8081/marker/getallmarkers',
  getAllMarkersNoCoords: 'http://localhost:8081/marker/getallmarkersNoCoords',
  saveMarker: 'http://localhost:8081/marker/savemarker',
  findCommerce: 'http://localhost:8081/comerce/find',
  findMarker: 'http://localhost:8081/marker/find',
  updateMarker: 'http://localhost:8081/marker/update',
  deleteMarker: 'http://localhost:8081/marker/delete',
  getAllShops: 'http://localhost:8081/comerce/getallshops',
  getAllCategories: 'http://localhost:8081/warehouse/getAllCategories',
  getAllNewOrderItems: 'http://localhost:8081/warehouse/getAllNewOrderItems',
  setAllNewOrderItems: 'http://localhost:8081/warehouse/setAllNewOrderItems',
  verifyAmountItemsOnStock: 'http://localhost:8081/warehouse/verifyAmountItemsOnStock',
  saveDeliveryOrder: 'http://localhost:8081/warehouse/sendDeliveryOrder',
  saveListDeliverySupplier: 'http://localhost:8081/warehouse/savelistdeliverysupplier',
  saveNewCategory: 'http://localhost:8081/warehouse/saveNewCategory',
  deleteCategory: 'http://localhost:8081/warehouse/deleteCategory',
  getAllItemsInStock: 'http://localhost:8081/warehouse/getallitems',
  getDeliveryItemsFromWarehouseByShop: 'http://localhost:8081/shops/getalldeliveriesnotinstock',
  vBarDataURL: 'http://localhost:8081/dashboard/getVbarData',
  hBarDataURL: 'http://localhost:8081/dashboard/getHbarData',
  dataLastMonthURL: 'http://localhost:8081/dashboard/getLastMonthData',
  dataCurrentMonthURL: 'http://localhost:8081/dashboard/getCurrentMonthDAta',
  yesterdaysDataURL: 'http://localhost:8081/dashboard/getYesterdaysData',
  actualsDataURL: 'http://localhost:8081/dashboard/getActualsData',
  saveDeliveryItemsToShopStock: 'http://localhost:8081/shops/saveNewDeliveryFromWarehouse',
  getAllSoldItemsListURL:  'http://localhost:8081/shops/getAllSoldItemsList',
  saveAllSoldItemsListURL:  'http://localhost:8081/shops/saveAllSoldItemsList',
  sendAllSoldItemsListURL:  'http://localhost:8081/shops/sendAllSoldItemsList',
  deleteCurrentSoldItemsListURL:  'http://localhost:8081/shops/deleteCurrentSoldItemsList',
  loadAllSoldItemsListURL: 'http://localhost:8081/shops/loadAllCurrentSoldItemsList',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
