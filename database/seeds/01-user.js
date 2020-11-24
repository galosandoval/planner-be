
exports.seed = function(knex) {
  const users = [
    {
      id: 1,
      username: 'galosan',
      password: 'password123',
      profile_pic: ''
    }
  ]
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};
