export const environment = {
  production: true,
  firebaseConfig : {
    apiKey: 'AIzaSyAYu4hMLTk28gkQPNcNEH3nYC6EqC3ZBZM',
    authDomain: 'platart-warehouse-user-mngt.firebaseapp.com',
    databaseURL: 'https://platart-warehouse-user-mngt.firebaseio.com',
    projectId: 'platart-warehouse-user-mngt',
    storageBucket: 'platart-warehouse-user-mngt.appspot.com',
    messagingSenderId: '144533891918',
    appId: '1:144533891918:web:494591651874627f7bcc1f'
  },
  saveCommerce: 'http://161.35.4.253:8081/comerce/savecomerce',
  getAllMarkers: 'http://161.35.4.253:8081/marker/getallmarkers',
  getAllMarkersNoCoords: 'http://161.35.4.253:8081/marker/getallmarkersNoCoords',
  saveMarker: 'http://161.35.4.253:8081/marker/savemarker',
  findCommerce: 'http://161.35.4.253:8081/comerce/find',
  findMarker: 'http://161.35.4.253:8081/marker/find',
  updateMarker: 'http://161.35.4.253:8081/marker/update',
  deleteMarker: 'http://161.35.4.253:8081/marker/delete',
  deleteCoords: 'http://161.35.4.253:8081/marker/deleteCoords',
  getAllShops: 'http://161.35.4.253:8081/comerce/getallshops',
  getAllCategories: 'http://161.35.4.253:8081/warehouse/getAllCategories',
  getAllNewOrderItems: 'http://161.35.4.253:8081/warehouse/getAllNewOrderItems',
  setAllNewOrderItems: 'http://161.35.4.253:8081/warehouse/setAllNewOrderItems',
  verifyAmountItemsOnStock: 'http://161.35.4.253:8081/warehouse/verifyAmountItemsOnStock',
  saveDeliveryOrder: 'http://161.35.4.253:8081/warehouse/sendDeliveryOrder',
  saveListDeliverySupplier: 'http://161.35.4.253:8081/warehouse/savelistdeliverysupplier',
  saveNewCategory: 'http://161.35.4.253:8081/warehouse/saveNewCategory',
  deleteCategory: 'http://161.35.4.253:8081/warehouse/deleteCategory',
  getAllItemsInStock: 'http://161.35.4.253:8081/warehouse/getallitems',
  getDeliveryItemsFromWarehouseByShop: 'http://161.35.4.253:8081/shops/getalldeliveriesnotinstock',
  saveDeliveryItemsToShopStock: 'http://161.35.4.253:8081/shops/saveNewDeliveryFromWarehouse',
  getAllSoldItemsListURL:  'http://161.35.4.253:8081/shops/getAllSoldItemsList',
  saveAllSoldItemsListURL:  'http://161.35.4.253:8081/shops/saveAllSoldItemsList',
  sendAllSoldItemsListURL:  'http://161.35.4.253:8081/shops/sendAllSoldItemsList',
  deleteCurrentSoldItemsListURL:  'http://161.35.4.253:8081/shops/deleteCurrentSoldItemsList',
  loadAllSoldItemsListURL: 'http://161.35.4.253:8081/shops/loadAllCurrentSoldItemsList',
  vBarDataURL: 'http://161.35.4.253:8081/dashboard/getVbarData',
  hBarDataURL: 'http://161.35.4.253:8081/dashboard/getHbarData',
  dataLastMonthURL: 'http://161.35.4.253:8081/dashboard/getLastMonthData',
  dataCurrentMonthURL: 'http://161.35.4.253:8081/dashboard/getCurrentMonthDAta',
  yesterdaysDataURL: 'http://161.35.4.253:8081/dashboard/getYesterdaysData',
  actualsDataURL: 'http://161.35.4.253:8081/dashboard/getActualsData',
  getShopInventoryAvailability: 'http://161.35.4.253:8081/shops/getShopInventoryAvailability',
  getShopInventoryItems: 'http://161.35.4.253:8081/shops/getShopInventoryItems',
  getAllItemsAllShops: 'http://161.35.4.253:8081/shops/getAllItemsAllShops',
  getSoldItemsList: 'http://161.35.4.253:8081/manager/getSoldItemsListByDateRange',
  getCheckinItemsList: 'http://161.35.4.253:8081/manager/getCheckinItemsListByDateRange',
};
