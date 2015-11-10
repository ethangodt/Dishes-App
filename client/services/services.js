angular.module('dishes.services', [])
.factory('getSections', function () {
  return function (ingredients) {
    return _.chain(ingredients).pluck('section').uniq().value();
  }
})
.factory('getIngredients', function () {
  return function (ingredients, section) {
    return _.where(ingredients, {section: section});
  }
})
.factory('fetchRecipes', ['$http', function ($http) {
  // makes call and stores on controller's $scope
	return function (queryString) {
		return $http.get('/api/recipes?' + queryString)
      .then(function (res) {
        return res.data;
      })
      .catch(function (err) {
        throw err;
      })
	};
}])
.factory('fetchLists', ['$http', function ($http) {
  // makes call and stores on controller's $scope
  return function (queryString) {
    return $http.get('/api/lists?' + queryString)
      .then(function (res) {
        return res.data;
      })
      .catch(function (err) {
        throw err;
      })
  };
}]);