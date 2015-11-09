var bookshelf = require('../../db/connection');

var Recipe = bookshelf.Model.extend({
  tableName: 'recipes'
});

//new Recipe({name: 'Baked Ziti'}).save().then(function(model) {
//  console.log(model);
//}).catch(function(err) {
//  console.log(err);
//});
//
//new Recipe().fetchAll().then(function(collection){
//  console.log(collection.models);
//});

