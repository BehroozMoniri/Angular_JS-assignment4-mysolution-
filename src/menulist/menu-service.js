(function () {
  "use strict";

  angular.module("MenuApp", [])
  .service("MenuDataService", MenuDataService);

  MenuDataService.$inject = ["$http", "APIBasePath", ];
  function MenuDataService($http, APIBasePath) {
    var service = this;

    var allCat = [];

    service.getAllCategories = function () {
      return $http({ method: "GET", url: APIBasePath + "/categories.json" })
        .then(function (response) {
          console.log(response.data);
          var shortNames = [];
          // response.data.forEach(function (item) {
          //   shortNames.push(item.short_name)
          // })
          // service.shortNames = shortNames;
          // var keys = Object.keys(response.data) ;
          // service.keys = keys
          //console.log(keys);
          return response.data;
        })
        .catch(function (error) {
          console.log("error in service method: " + error);
        });
    };

    service.getItemsForCategory = function (categoryShortName) {
      return $http({
        method: "GET",
        url: APIBasePath + "/menu_items/{params}.json",
        params: { category: categoryShortName },
      })
        .then(function (response) {
          console.log(response.data);
          return response.data;
        })
        .catch(function (error) {
          console.log("error in service method: " + error);
        });
    };

    service.removeItem = function (itemIndex) {
      foundItems.splice(itemIndex, 1);
    };
  }
})();
