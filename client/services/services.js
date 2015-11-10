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
});