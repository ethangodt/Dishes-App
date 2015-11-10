dishes.controller('shoppingListsController', [
  '$scope',
  '$location',
  'fetchLists', // change this
  function ($scope, $location, fetchLists) {
    (function init () {
      var apiQuery = 'names_only=true'; // parse query string
      fetchLists(apiQuery)
      .then(function (res) {
        $scope.lists = res;
      });
    })();
  }]);