//Define the numerous user roles
const SUPERVISOR = "supervisor";
const SALES = "sales";
const MANAGER = "manager";
const CUSTOMER = "customer";

const ROLES = [SUPERVISOR, SALES, MANAGER, CUSTOMER];

//Define the load details for each vehicle types
const LOAD_DETAILS = [
  {
    vehicle: "bodaboda",
    down_payment: 850000,
    payable_duration: 2,
    monthly_installment: 214590
  },
  {
    vehicle: "tuktuk",
    down_payment: 950000,
    payable_duration: 2,
    monthly_installment: 294590
  }
];

console.log("Welcome to BodaBoda Banja");

let createCustomer = () => {
  Response.redirect("/sales/customers", 500);
};

let add_customers_btn = document.getElementById("add_customers");
add_customers_btn.addEventListener("click", createCustomer);
