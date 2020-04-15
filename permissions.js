const roles = {
  admin: {
    homepage: '/admin/saleslist',
    actions: ['can_create_salesmen', 'can_view_salesmen']
  },
  supervisor: {
    homepage: '/supervisor/customerslist',
    actions: ['can_view_certain_salesmen']
  },
  sales: {
    homepage: '/sales/customerslist',
    actions: ['can_create_customers', 'can_view_customers']
  },
  customer: {
    homepage: '',
    actions: []
  }
};

module.exports = roles;
