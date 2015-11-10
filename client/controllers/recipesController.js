dishes.controller('recipesController', ['$scope', '$location', '$http', 'fetchRecipes', function ($scope, $location, $http, fetchRecipes) {
  (function () {
    fetchRecipes('names_only=true')
      .then(function (recipes) {
      	$scope.recipes = recipes;
      })
  })();

  var toListCollection = [];

  $scope.toggleInCollection = function (clickedRecipe) {
    console.log('hey');
    if (!_.contains(toListCollection, clickedRecipe)) {
      toListCollection.push(clickedRecipe);
      console.log('toggling');
    } else {
      toListCollection = _.filter(toListCollection, function (recipe) {
        console.log('toggling');
        return !(recipe === clickedRecipe);
      })
    }
  };

  $scope.newRecipeButton = function () {
    $location.path('/create-recipe');
  };

  $scope.shoppingListsButton = function () {
    $location.path('/shopping-lists');
  };

  $scope.createNewList = function () {
    var queryString = [];
    toListCollection.forEach(function (recipe) {
      queryString.push(recipe.recipe_name);
    });
    queryString = queryString.join(',');
    $location.path('/pending-list').search('recipes', queryString);
  };
}]);