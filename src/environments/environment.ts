// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyAYu4hMLTk28gkQPNcNEH3nYC6EqC3ZBZM',
    // apiKey: 'AIzaSyDJhdco0XHCyzznyep0zEoTl_QQ8YCJ8_M',
    authDomain: 'platart-warehouse-user-mngt.firebaseapp.com',
    databaseURL: 'https://platart-warehouse-user-mngt.firebaseio.com',
    projectId: 'platart-warehouse-user-mngt',
    storageBucket: 'platart-warehouse-user-mngt.appspot.com',
    messagingSenderId: '144533891918',
    appId: '1:144533891918:web:494591651874627f7bcc1f'
  },
  saveCommerce: 'https://localhost:8081/comerce/savecomerce',
  getAllUsers: 'https://localhost:8081/user/getallusers',
  getAllMarkers: 'https://localhost:8081/marker/getallmarkers',
  getAllMarkersNoCoords: 'https://localhost:8081/marker/getallmarkersNoCoords',
  saveMarker: 'https://localhost:8081/marker/savemarker',
  saveUser: 'https://localhost:8081/user/saveuser',
  findUser: 'https://localhost:8081/user/finduser',
  findCommerce: 'https://localhost:8081/comerce/find',
  findMarker: 'https://localhost:8081/marker/find',
  editMarker: 'https://localhost:8081/marker/edit',
  updateMarker: 'https://localhost:8081/marker/update',
  deleteMarker: 'https://localhost:8081/marker/delete',
  deleteCoords: 'https://localhost:8081/marker/deleteCoords',
  getAllShops: 'https://localhost:8081/comerce/getallshops',
  getAllActivatedCategories: 'https://localhost:8081/warehouse/getAllActivatedCategories',
  getAllCategories: 'https://localhost:8081/warehouse/getAllCategories',
  getAllDeactivatedCategories: 'https://localhost:8081/warehouse/getAllDeactivatedCategories',
  getAllNewOrderItems: 'https://localhost:8081/warehouse/getAllNewOrderItems',
  setAllNewOrderItems: 'https://localhost:8081/warehouse/setAllNewOrderItems',
  verifyAmountItemsOnStock: 'https://localhost:8081/warehouse/verifyAmountItemsOnStock',
  saveDeliveryOrder: 'https://localhost:8081/warehouse/sendDeliveryOrder',
  saveListDeliverySupplier: 'https://localhost:8081/warehouse/savelistdeliverysupplier',
  saveNewCategory: 'https://localhost:8081/warehouse/saveNewCategory',
  activateCategory: 'https://localhost:8081/warehouse/activateCategory',
  deactivateCategory: 'https://localhost:8081/warehouse/deactivateCategory',
  getAllItemsInStock: 'https://localhost:8081/warehouse/getallitems',
  getDeliveryItemsFromWarehouseByShop: 'https://localhost:8081/shops/getalldeliveriesnotinstock',
  getTurnoverByDate: 'https://localhost:8081/dashboard/getTurnoverByDate',
  getTurnoverByShopURL: 'https://localhost:8081/dashboard/getTurnoverByShop',
  getAggregatedDataForPeriod: 'https://localhost:8081/dashboard/getAggregatedDataForPeriod',
  getDailyDataForPeriod: 'https://localhost:8081/dashboard/getDailyDataForPeriod',
  getCategoryDataURL: 'https://localhost:8081/dashboard/getCategoryData',
  saveDeliveryItemsToShopStock: 'https://localhost:8081/shops/saveNewDeliveryFromWarehouse',
  getShopSpecificSoldItemsList: 'https://localhost:8081/shops/getShopSpecificSoldItemsList',
  saveShopSpecificSoldItemsList: 'https://localhost:8081/shops/saveShopSpecificSoldItemsList',
  sendSpecificShopSoldItemsList: 'https://localhost:8081/shops/sendSpecificShopSoldItemsList',
  sendShopSpecificSoldItemsListURL: 'https://localhost:8081/shops/sendShopSpecificSoldItemsList',
  deleteShopSpecificCheckoutSoldItemsList: 'https://localhost:8081/shops/deleteShopSpecificCheckoutSoldItemsList',
  loadAllSoldItemsListURL: 'https://localhost:8081/shops/loadAllCurrentSoldItemsList',
  getShopInventoryAvailability: 'https://localhost:8081/shops/getShopInventoryAvailability',
  getShopInventoryItems: 'https://localhost:8081/shops/getShopInventoryItems',
  getAllItemsAllShops: 'https://localhost:8081/shops/getAllItemsAllShops',
  getSoldItemsList: 'https://localhost:8081/manager/getSoldItemsListByShopAndDateRange',
  getCheckinItemsList: 'https://localhost:8081/manager/getCheckinItemsListByDateRange',
  getAllCheckedInItems: 'https://localhost:8081/shops/getAllCheckedInItems',
  getSpecificCheckedInItems: 'https://localhost:8081/shops/getSpecificCheckedInItems',
  getSpecificCheckedInItemsDate: 'https://localhost:8081/shops/getSpecificCheckedInItemsDate',
  deleteItemsNewDeliveryToShop: 'https://localhost:8081/warehouse/deleteItems'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
