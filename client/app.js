var dishes = angular.module('dishes', ['ngRoute', 'dishes.services']);

dishes.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/recipes.html',
      controller: 'recipesController'
    })
    .when('/create-recipe', {
      templateUrl: 'templates/createRecipe.html',
      controller: 'createRecipeController'
    })
    .when('/shopping-lists', {
      templateUrl: 'templates/shoppingLists.html',
      controller: 'shoppingListsController'
    })
    .when('/shopping-list/:list', {
      templateUrl: 'templates/shoppingList.html',
      controller: 'shoppingListController'
    })
    .when('/pending-list', {
        templateUrl: 'templates/pendingList.html',
        controller: 'pendingListController'
    });
});