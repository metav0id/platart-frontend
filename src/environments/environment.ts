// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyAYu4hMLTk28gkQPNcNEH3nYC6EqC3ZBZM',
    authDomain: 'platart-warehouse-user-mngt.firebaseapp.com',
    databaseURL: 'https://platart-warehouse-user-mngt.firebaseio.com',
    projectId: 'platart-warehouse-user-mngt',
    storageBucket: 'platart-warehouse-user-mngt.appspot.com',
    messagingSenderId: '144533891918',
    appId: '1:144533891918:web:494591651874627f7bcc1f'
  },
  saveCommerce: 'http://localhost:8081/comerce/savecomerce',
  getAllMarkers: 'http://localhost:8081/marker/getallmarkers',
  getAllMarkersNoCoords: 'http://localhost:8081/marker/getallmarkersNoCoords',
  saveMarker: 'http://localhost:8081/marker/savemarker',
  findCommerce: 'http://localhost:8081/comerce/find',
  findMarker: 'http://localhost:8081/marker/find',
  editMarker: 'http://localhost:8081/marker/edit',
  updateMarker: 'http://localhost:8081/marker/update',
  deleteMarker: 'http://localhost:8081/marker/delete',
  deleteCoords: 'http://localhost:8081/marker/deleteCoords',
  getAllShops: 'http://localhost:8081/comerce/getallshops',
  getAllActivatedCategories: 'http://localhost:8081/warehouse/getAllActivatedCategories',
  getAllCategories: 'http://localhost:8081/warehouse/getAllCategories',
  getAllDeactivatedCategories: 'http://localhost:8081/warehouse/getAllDeactivatedCategories',
  getAllNewOrderItems: 'http://localhost:8081/warehouse/getAllNewOrderItems',
  setAllNewOrderItems: 'http://localhost:8081/warehouse/setAllNewOrderItems',
  verifyAmountItemsOnStock: 'http://localhost:8081/warehouse/verifyAmountItemsOnStock',
  saveDeliveryOrder: 'http://localhost:8081/warehouse/sendDeliveryOrder',
  saveListDeliverySupplier: 'http://localhost:8081/warehouse/savelistdeliverysupplier',
  saveNewCategory: 'http://localhost:8081/warehouse/saveNewCategory',
  activateCategory: 'http://localhost:8081/warehouse/activateCategory',
  deactivateCategory: 'http://localhost:8081/warehouse/deactivateCategory',
  getAllItemsInStock: 'http://localhost:8081/warehouse/getallitems',
  getDeliveryItemsFromWarehouseByShop: 'http://localhost:8081/shops/getalldeliveriesnotinstock',
  getTurnoverByDate: 'http://localhost:8081/dashboard/getTurnoverByDate',
  getTurnoverByShopURL: 'http://localhost:8081/dashboard/getTurnoverByShop',
  getAggregatedDataForPeriod: 'http://localhost:8081/dashboard/getAggregatedDataForPeriod',
  getDailyDataForPeriod: 'http://localhost:8081/dashboard/getDailyDataForPeriod',
  getCategoryDataURL: 'http://localhost:8081/dashboard/getCategoryData',
  saveDeliveryItemsToShopStock: 'http://localhost:8081/shops/saveNewDeliveryFromWarehouse',
  getAllSoldItemsListURL: 'http://localhost:8081/shops/getAllSoldItemsList',
  saveAllSoldItemsListURL: 'http://localhost:8081/shops/saveAllSoldItemsList',
  sendAllSoldItemsListURL: 'http://localhost:8081/shops/sendAllSoldItemsList',
  deleteCurrentSoldItemsListURL: 'http://localhost:8081/shops/deleteCurrentSoldItemsList',
  loadAllSoldItemsListURL: 'http://localhost:8081/shops/loadAllCurrentSoldItemsList',
  getShopInventoryAvailability: 'http://localhost:8081/shops/getShopInventoryAvailability',
  getShopInventoryItems: 'http://localhost:8081/shops/getShopInventoryItems',
  getAllItemsAllShops: 'http://localhost:8081/shops/getAllItemsAllShops',
  getSoldItemsList: 'http://localhost:8081/manager/getSoldItemsListByShopAndDateRange',
  getCheckinItemsList: 'http://localhost:8081/manager/getCheckinItemsListByDateRange',
  getAllCheckedInItems: 'http://localhost:8081/shops/getAllCheckedInItems',
  getSpecificCheckedInItems: 'http://localhost:8081/shops/getSpecificCheckedInItems',
  getSpecificCheckedInItemsDate: 'http://localhost:8081/shops/getSpecificCheckedInItemsDate'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
