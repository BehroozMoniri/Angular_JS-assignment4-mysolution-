(function () {
  'use strict';
  angular.module('MenuApp', [])

    .controller('MenuController',MenuController)
    .service('MenuDataService', MenuDataService)
    .constant('APIBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com")
    .component('foundItems',    {
    templateUrl: 'foundItems.html',
    controller: MenuController,
    controllerAs: 'menu',
    bindings :    {
      categories : 'menu.categories',
      items: 'menu.items',
      onRemove: '&'
    }     
  }) 

MenuController.$inject = ['MenuDataService', '$scope' ];
function MenuController(MenuDataService, $scope) {
    var menu = this;
    
    menu.$onInit = function( ) {
    //menu.getAllCategories = function( ) {
         MenuDataService.getAllCategories( )
            .then(function (response) {
              menu.items = response;   
             // menu.title = ("Found " + menu.list.length + " items" )  
             var names =   []
             var shortNames =   []
              response.forEach(function (item) {
                shortNames.push(item.short_name)
              })
              menu.shortNames = shortNames;
             response.forEach(function (item) {
               names.push(item.name)
             })
             menu.categoryNames = names;
              
            })
            .catch(function (error) {
               console.log("error in click function: " + error);
            }) ;
            return menu.categoryNames
    };
  };
MenuDetailController.$inject = ['MenuDataService', '$scope' ];
function MenuDetailController(MenuDataService, $scope) {
    var menu_detail = this;
    menu_detail.getItemsForCategory = function(categoryShortName) {
      obj = MenuDataService.getItemsForCategory(categoryShortName)
      menu_detail.category = obj.category.name;
      menu_detail.items = obj.menu_items;

     // obj has keys category.name and obj.menu_items is a list 
     // each item in obj.menu_items has item.name and item.description and item.price_large
      return obj
    }
    
      menu.removeItem  = function (itemIndex) {
        MenuDataService.removeItem(itemIndex);
        //menu.title = ("Found " + menu.list.length + " items" );  
      };
 
};

MenuDataService.$inject = ['$http', 'APIBasePath' ,  '$timeout' , '$q'];
function MenuDataService($http, APIBasePath ,   timeout, $q) {
    var service = this;
     
    var allCat = [];

    service.getAllCategories = function() {
      return $http({method: "GET", url: (APIBasePath+"/categories.json")})
      .then(function (response) {
        console.log(response.data)
        var shortNames =   []
        // response.data.forEach(function (item) {
        //   shortNames.push(item.short_name)
        // })
        // service.shortNames = shortNames;
        // var keys = Object.keys(response.data) ;
        // service.keys = keys
          //console.log(keys);
        return response.data;
      }).catch(function (error) {
      console.log("error in service method: "+ error);
    });
    };

   
      service.getItemsForCategory = function(categoryShortName) {
      return $http({method: "GET", 
      url: (APIBasePath+"/menu_items/{category}.json"),
      params: { category: categoryShortName}  
        })
         .then(function (response) {
          console.log(response.data)
          // var cat = response.data.category
          // var items = response.data.menu_items
          // var obj  = {
          //   cat : cat,
          //   items : items
          // }
        return response.data;
      }).catch(function (error) {
        console.log("error in service method: "+ error);
      });
    };


  }
})();
