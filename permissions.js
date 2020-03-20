let roles = {
  admin: {
    Homepage: "/admin",
    actions: ["can_create_salesmen", "can_view_salesmen"]
  },
  supervisor: {
    homepage: "/supervisor",
    actions: ["can_view_certain_salesmen"]
  },
  sales: {
    homepage: "/salesmen",
    actions: ["can_create_customers", "can_view_customers"]
  },
  customer: {
    homepage: "",
    actions: []
  }
};

module.exports = roles;
