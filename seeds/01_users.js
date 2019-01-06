exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, location: 'Portland', phone: '2074653217'},
        { id: 2, location: 'Portland', phone: '2071111115' },
        { id: 3, location: 'Cape Elizabeth', phone: '2072072070' },
      ]);
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('users_id_seq', (SELECT MAX(id) from users));`
      )
    })
}