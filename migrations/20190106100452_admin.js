exports.up = (knex, Promise) => {
  return knex.schema.createTable("admin", table => {
    table.increments();
    table.string("name").notNullable();
    table.string("pass");
  });
};

exports.down = (knex, Promise) => {
  let dropQuery = `DROP TABLE admin`;
  return knex.raw(dropQuery);
};
