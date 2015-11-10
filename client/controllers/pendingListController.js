dishes.controller('pendingListController', [
  '$scope',
  '$http',
  '$routeParams',
  '$location',
  'fetchRecipes',
  'getSections',
  'getIngredients',
  function ($scope, $http, $routeParams, $location, fetchRecipes, getSections, getIngredients) {
    var ingredients;

    var mapIngredients = function (serverResponse) {
      var mapper = function (obj) {
        return {
          name: obj.ingredient_name,
          quantity: obj.quantity,
          section: obj.section
        };
      };

      return _.map(serverResponse, mapper);
    };

    (function init () {
      var recipes = $location.search().recipes.split(','); // parse query string
      var apiQuery = [];
      recipes.forEach(function (recipeName) {
        apiQuery.push('recipes[]=' + recipeName);
      });
      apiQuery = apiQuery.join('&');
      fetchRecipes(apiQuery)
        .then(function (res) {
          ingredients = mapIngredients(res);
          console.log(ingredients);
        });
    })();

    // remove stuff from ingredients list on click
    $scope.removeIngredient = function (clickedIngredient) {
      ingredients = _.reject(ingredients, function (ingredient) {return clickedIngredient === ingredient})
    };

    $scope.cancelButton = function () {
      $location.path('/').search('');
    };

    $scope.createList = function () {
      var payload = {
        listName: new Date().toUTCString(),
        ingredients: ingredients
      };

      $http.post('/api/lists/', payload)
        .then(function () {
          $location.path('/shopping-lists').search('');
        });
    };

    $scope.getSections = function () {
      return getSections(ingredients);
    };

    $scope.getIngredients = function (section) {
      return getIngredients(ingredients, section)
    };
}]);