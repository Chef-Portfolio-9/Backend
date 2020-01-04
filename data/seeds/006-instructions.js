
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('instructions').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('instructions').insert([
        {step_number: '', instruction: ''},
        {step_number: '', instruction: ''},
        {step_number: '', instruction: ''},
        {step_number: '', instruction: ''},
        {step_number: '', instruction: ''}
      ]);
    });
};
