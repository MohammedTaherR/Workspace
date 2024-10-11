const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seatsSechma = new Schema({
  seatNumber: {
    type: Number,
    required: true
  },
  isBooked: {
    type: Boolean,
    default: false
  },
  rowNumber: {
    type: Number,
    required: true
  },
  isMonitorPresent:{
    type: Boolean,
    default: false
  },
  empGmail : {
    type: String,
    default: null
  },
  empName : {
    type: String,
    default: null
  },
  bookingDateFrom : {
    type: Date,
    default: null
  },
  bookingDateTo : {
    type: Date,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const Seat = mongoose.model('seat', seatsSechma);

module.exports = Seat;
