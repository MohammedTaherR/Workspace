const express = require('express');
const router = express.Router();
const { isAdmin} = require('../controller/seats.controller');

//  reset all seats
router.post('/', isAdmin);

module.exports = router;
