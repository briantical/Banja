// Define the numerous user roles
const SUPERVISOR = 'supervisor';
const SALES = 'sales';
const MANAGER = 'manager';
const CUSTOMER = 'customer';

const ROLES = [SUPERVISOR, SALES, MANAGER, CUSTOMER];

// Define the load details for each vehicle types
const vehicles = [
  {
    name: 'BodaBoda',
    downPayment: 850000,
    payableDuration: 2,
    monthlyInstallment: 214590
  },
  {
    name: 'TukTuk',
    downPayment: 950000,
    payableDuration: 2,
    monthlyInstallment: 294590
  }
];

const downPaymentChange = () => {
  const vehicleTypeValue = document.getElementById('vehicleType').value;
  const downPayment = document.getElementById('downPayment');

  switch (vehicleTypeValue) {
    case vehicles[0].name:
      downPayment.setAttribute('min', vehicles[0].downPayment);
      downPayment.setAttribute('placeholder', vehicles[0].downPayment);
      break;
    case vehicles[1].name:
      downPayment.setAttribute('min', vehicles[1].downPayment);
      downPayment.setAttribute('placeholder', vehicles[1].downPayment);
      break;
    default:
      break;
  }
};

const insertElements = () => {
  vehicles.map((vehicle) => {
    const vehicleType = document.getElementById('vehicleType');
    vehicleType.addEventListener('change', downPaymentChange);
    const vehicleoption = document.createElement('option');
    vehicleoption.setAttribute('value', vehicle.name);
    vehicleoption.innerHTML = vehicle.name;
    vehicleType.appendChild(vehicleoption);
    return null;
  });

  vehicles.map((vehicle) => {
    const cell = document.getElementById('downpaymentcell');
    const downpayment = document.createElement('input');

    const vehicleTypeValue = document.getElementById('vehicleType').value;

    if (vehicleTypeValue === vehicle.name) {
      downpayment.setAttribute('id', 'downPayment');
      downpayment.setAttribute('name', 'downPayment');
      downpayment.setAttribute('class', 'form-control');
      downpayment.setAttribute('type', 'number');
      downpayment.setAttribute('required', 'true');
      downpayment.setAttribute('min', vehicle.downPayment);
      downpayment.setAttribute('placeholder', vehicle.downPayment);
      cell.appendChild(downpayment);
    }
    return null;
  });
};
