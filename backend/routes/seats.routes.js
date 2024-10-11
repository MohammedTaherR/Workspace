const express = require('express');
const router = express.Router();
const { bookingController, resetSeatsController, getSeats, deleteSeat, cancelSeat, addSeat} = require('../controller/seats.controller');

//  reset all seats
router.post('/', resetSeatsController)

//  get all seats
router.get('/', getSeats);

//  book seats
router.post('/book', bookingController);

//  cancel seats
router.post('/cancel', cancelSeat);

// add seats
router.post('/add', addSeat);

// delete seats
router.post('/remove', deleteSeat);

module.exports = router;
