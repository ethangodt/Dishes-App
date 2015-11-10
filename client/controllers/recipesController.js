dishes.controller('recipesController', ['$scope', '$location', function ($scope, $location) {
  $scope.recipes = [];

  $scope.newRecipe = function () {
    $location.path('/create-recipe');
  };

  $scope.shoppingLists = function () {
    $location.path('/shopping-lists');
  };

  $scope.createNewList = function () {
    // take recipes and push to path for redirect
    // todo make sure to handle the cases where the recipes don't exist on the pending page, maybe
  };

  (function () {
    $scope.recipes = [1,3,2,4];
  })();
}]);