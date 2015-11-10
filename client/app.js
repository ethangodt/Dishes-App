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
    }
  )
});