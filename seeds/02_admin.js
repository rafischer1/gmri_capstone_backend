exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('admin').del()
    .then(() => {
      // Inserts seed entries
      return knex('admin').insert([
        { id: 1, name: 'ADMIN', pass: 'password' },
        { id: 2, name: 'ARTIE', pass: 'Fischer' },
      ]);
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('admin_id_seq', (SELECT MAX(id) from admin));`
      )
    })
}