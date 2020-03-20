let roles = {
  admin: {
    homepage: "/admin/sales",
    actions: ["can_create_salesmen", "can_view_salesmen"]
  },
  supervisor: {
    homepage: "/supervisor/customers",
    actions: ["can_view_certain_salesmen"]
  },
  sales: {
    homepage: "/sales/customers",
    actions: ["can_create_customers", "can_view_customers"]
  },
  customer: {
    homepage: "",
    actions: []
  }
};

module.exports = roles;
