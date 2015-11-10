var express = require('express');
var bodyParser = require('body-parser');

var knex = require('./db/connection.js');

var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/client'));

app.route('/api/recipes')
  .get(function (req, res) {
    if (req.query['name_only'] === 'true') {
      knex('recipes')
      .select()
        .then(function (data) {
        	res.send(data);
        })
    } else {
      var recipes = req.query.recipes.split(',');

      knex
      .select()
      .from('recipes')
      .innerJoin('r_i_join', 'recipes.id', 'r_i_join.r_id')
      .whereIn('recipes.recipes_name', recipes)
      .innerJoin('ingredients', 'r_i_join.i_id', 'ingredients.id')
        .then(function(data){
          res.send(data);
        });
    }
  })
  .post(function (req, res) {
    var recipeName = req.body.name;
    var imageUrl = req.body.imageUrl;
    var ingredients = req.body.ingredients;
    var count = 0;
    var recipeId;

    // todo refactor this to better use queries
    // make sure that there are no duplicates on insertion (like by forcing capitaliztion)
    knex('recipes')
    .insert({
      // todo change this back to name when selection is resolved
      recipe_name: recipeName,
      imageUrl: imageUrl
    })
    .then(function(ids){
      recipeId = ids[0];
      ingredients.forEach(function(ingredient){
        var quantity = ingredient.quantity;
        knex('ingredients').insert({
          ingredient_name: ingredient.name,
          section: ingredient.section
        })
        .then(function (ids) {
            return ids[0];
        })
        .then(function (ingredientId) {
          return knex('r_i_join').insert({ // insert into join table
            r_id: recipeId,
            i_id: ingredientId,
            quantity: quantity
          })
        })
        .then(function(){
          count++;
          if (count === ingredients.length) {
            res.status(201).end();
          }
        })
      });
    });
  });

// post / get list
app.route('/api/list')
  .get(function () {
    // do stuff
  })
  .post(function () {

  });

// get lists
app.route('/api/lists')
  .get(function (req, res) {
    knex('lists').select()
      .then(function (data) {
      	res.send(data);
      });
  });

app.listen(4546);