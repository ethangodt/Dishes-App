dishes.controller('shoppingListController', [
  '$scope',
  '$location',
  '$routeParams',
  'fetchLists', // change this
  'getSections',
  'getIngredients',
  function ($scope, $location, $routeParams, fetchLists, getSections, getIngredients) {
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
      var apiQuery = 'listName=' + $routeParams.list; // parse query string
      fetchLists(apiQuery)
        .then(function (res) {
          ingredients = mapIngredients(res);
        });
    })();

    $scope.getSections = function () {
      return getSections(ingredients);
    };

    $scope.getIngredients = function (section) {
      return getIngredients(ingredients, section)
    };
  }]);