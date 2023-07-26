
(function () {
'use strict';
    
   
angular.module('MenuApp', ['MenuDataService'])
.controller('MenuController', MenuController);
     

MenuController.$inject = ['MenuDataService'  ];
function MenuController(MenuDataService ) {
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
            return menu.items
    };
  };
    
})();
                

