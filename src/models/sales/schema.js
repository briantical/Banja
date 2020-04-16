const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
  Types: { ObjectId }
} = Schema;

const saleschema = new mongoose.Schema({
  ids: String,
  user: { type: ObjectId, ref: 'User' },
  supervisor: String,
  numberOfWorkingDays: Number,
  email: String
});

module.exports = saleschema;
