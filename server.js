var express = require('express');
var bodyParser = require('body-parser');

var knex = require('./db/connection.js');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

app.route('/api/recipes')
  // refactor this craziness
  .get(function (req, res) {
    // todo make this end point less screwy - names only is not true
    if (req.query['names_only'] === 'true') {
      knex('recipes')
      .select()
        .then(function (data) {
        	res.send(data);
        })
    } else if (req.query.recipes) {
      knex
      .select()
      .from('recipes')
      .innerJoin('r_i_join', 'recipes.id', 'r_i_join.r_id')
      .whereIn('recipes.recipe_name', req.query.recipes)
      .innerJoin('ingredients', 'r_i_join.i_id', 'ingredients.id')
        .then(function(data){
          res.send(data);
        });
    } else {
      res.status(400).send();
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

//app.route('/api/list')
//  .get(function () {
//    // do stuff
//  })
//  .post(function () {
//    // do other stuff
//  });

app.route('/api/lists')
  .post(function (req, res) { // post a newly created list to the database
    var listName = req.body.listName;
    var ingredients = req.body.ingredients;
    var count = 0;
    var listId;

    knex('lists')
      .insert({
        list_name: listName
      })
      .then(function(ids){
        listId = ids[0];
        ingredients.forEach(function(ingredient){
          var quantity = ingredient.quantity;
          knex('ingredients')
          .select('id')
          .where({ingredient_name: ingredient.name})
          .then(function (data) {
            return knex('l_i_join').insert({ // insert into join table
              l_id: listId,
              i_id: data[0].id,
              quantity: quantity
            })
          })
          .then(function(){
            count++;
            if (count === ingredients.length) {
              res.status(201).end();
            }
          });
        });
      });
  })
  .get(function (req, res) { // get either all list names or get all the ingredients for a specific list
    if (req.query['names_only'] === 'true') {
      knex('lists')
        .select()
        .then(function (data) {
          res.send(data);
        })
    } else if (req.query.listName) {
      knex
        .select()
        .from('lists')
        .innerJoin('l_i_join', 'lists.id', 'l_i_join.l_id')
        .where('lists.list_name', req.query.listName)
        .innerJoin('ingredients', 'l_i_join.i_id', 'ingredients.id')
        .then(function(data){
          res.send(data);
        });
    } else {
      res.status(400).send();
    }
  });

app.listen(4546);