var express = require('express');
var bodyParser = require('body-parser');

// todo get reference to models and collections of ORM
var knex = require('./db/connection.js');

var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/client'));

// post / get recipes
app.route('/api/recipes')
  .get(function (req, res) {
    // if scope is star then grab all
    // else make selection based on body
    // return to client

    // do double inner join on stuff
    knex('recipes').select()
      .then(function(data) {
        res.send(data);
      })
      .catch(function(err) {
        console.log(err);
      });
  })
  .post(function (req, res) {
    var recipeName = req.body.name;
    var imageUrl = req.body.imageUrl;
    var ingredients = req.body.ingredients;
    var count = 0;
    var recipeId;
    var ingredientId;

    // todo refactor this to better use queries and promises
    // make sure that a response is sent
    // make sure that there are no duplicates on insertion (like by forcing capitaliztion)
    knex('recipes')
      .insert({name: recipeName})
        .then(function(ids){
          recipeId = ids[0];
          ingredients.forEach(function(ingredient){
            knex('ingredients').insert({
              name: ingredient.name,
              section: ingredient.section
            })
            .then(function (ids) {
              ingredientId = ids[0];
              knex('r_i_join').insert({
                r_id: recipeId,
                i_id: ingredientId,
                quantity: '4 lbs'
              }).then(function(){
                count++;
                if (count === ingredient.length) {
                  res.end();
                }
              })
            })
          })
        });


    // post name to recipes
    // loop through ingredients
      // post ingredient to ingredient table
      // post ingredient id and recipe id to join table
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
  .get(function () {

  });

app.listen(4546);