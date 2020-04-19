const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
  Types: { ObjectId }
} = Schema;

const customerschema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User' },
  customerID: String,
  NIN: String,
  nationality: String,
  maritalStatus: String,
  documents: Boolean,
  vehicleType: String,
  downPayment: Number,
  lastPayment: Date,
  stageName: String,
  supervisor: String,
  lcOne: String,
  lcThree: String,
  refereeName: String,
  refereeDob: Date,
  refereeContact: String,
  refereeOccupation: String
});

module.exports = customerschema;
