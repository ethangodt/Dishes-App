dishes.controller('createRecipeController', ['$scope', '$http', '$location', 'getSections', 'getIngredients', function($scope, $http, $location, getSections, getIngredients) {
  $scope.recipeName = '';
  $scope.imageUrl = '';

  $scope.ingredientName = '';
  $scope.quantity = '';
  $scope.section = 'other';

  var ingredients = [];

  // todo set it up so that this can only be invoked if the required fields are set
  $scope.saveIngredient = function () {
    var obj = {
      name: $scope.ingredientName,
      quantity: $scope.quantity,
      section: $scope.section
    };

    ingredients.push(obj);
    console.log(ingredients);

    $scope.ingredientName = '';
    $scope.quantity = '';
  };

  // save recipe - post request to the server, and then a redirect to the homepage
  $scope.saveRecipe = function () {
    $http.post('/api/recipes', {
      name: $scope.recipeName,
      imageUrl: $scope.imageUrl,
      ingredients: ingredients
    })
    .then(function () {
      $location.path('/');
    })
    .catch(function (err) {
      console.log(err);
    })
  };

  $scope.cancel = function () {
    $location.path('/');
  };

  $scope.getSections = function () {
    return getSections(ingredients);
  };

  $scope.getIngredients = function (section) {
    return getIngredients(ingredients, section)
  };
}]);