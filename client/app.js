var dishes = angular.module('dishes', ['ngRoute', 'dishes.services']);

dishes.config(function ($routeProvider) {
  $routeProvider
    .when('/create-recipe', {
      templateUrl: 'templates/createRecipe.html',
      controller: 'createRecipeController'
    })
});