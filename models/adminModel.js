const knex = require("../knex");

// Returns the user with the given ID
const getAdminUser = name => {
  return knex("users")
    .where("name", name)
    .then(user => user[0])
    .catch(err => {
      Promise.reject(err);
    });
};

module.exports = { getAdminUser }