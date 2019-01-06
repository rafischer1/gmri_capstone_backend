exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', table => {
    table.increments()
    table.string('location').notNullable()
    table.string('phone')
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()
  })
}

exports.down = (knex, Promise) => {
  let dropQuery = `DROP TABLE users`
  return knex.raw(dropQuery)
};
