
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('lookup').del()
    .then(function () {
      // Inserts seed entries
      return knex('lookup').insert([
        {
          type: 'periodView',
          key: 'BC',
          value: 'Base/Current',
          sort_order: 1,
          is_active: true,
          created_by: 'abc',
          updated_by: 'abc'
        },
        {
          type: 'periodView',
          key: 'B',
          value: 'Base',
          sort_order: 2,
          is_active: true,
          created_by: 'abc',
          updated_by: 'abc'
        },
        {
          type: 'periodView',
          key: 'C',
          value: 'Current',
          sort_order: 3,
          is_active: true,
          created_by: 'abc',
          updated_by: 'abc'
        },
        {
          type: 'datesIncurred',
          key: 'R12',
          value: 'Rollling 12 months',
          sort_order: 1,
          is_active: true,
          created_by: 'abc',
          updated_by: 'abc'
        },
        {
          type: 'datesIncurred',
          key: 'R6',
          value: 'Rollling 6 months',
          sort_order: 2,
          is_active: true,
          created_by: 'abc',
          updated_by: 'abc'
        },
        {
          type: 'datesIncurred',
          key: 'CYTD',
          value: 'Current Year to Date',
          sort_order: 3,
          is_active: true,
          created_by: 'abc',
          updated_by: 'abc'
        }
      ]);
    });
};
