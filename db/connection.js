var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : 'hr',
    database : 'dishes_db',
    charset  : 'utf8'
  }
});

module.exports = knex;