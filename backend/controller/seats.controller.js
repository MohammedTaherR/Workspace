// controller.js
const Seat = require('../models/seats.model');
const {Admin} = require('../models/admin.model');

// Controller function to book seats
/*
  {
    seatNumber, 
        EEmail,
        Ename,
        date from,
        date to,
  }
*/
const bookingController = async (req, res) => {
    // TODO: handle if not all params are available 
    const {
      dateFrom,
      dateTo,
      seatNumber,
      empGmail,
      empName
    } = req.body;
    // console.log('booking from be',req.body);
    try{
      let seat  = await Seat.findOne({ seatNumber });
      let empSeat = await Seat.findOne({ empGmail });       
      if(!seat){
        return res.status(200).json({ message: 'Seat not found',ok: false });
      }
      if(seat.isBooked){
        return res.status(200).json({ message: 'Seat already booked',ok: false  });
      }
      if(empSeat){
        return res.status(200).json({ message: 'Employee already booked seats',ok: false  });
      }
      seat.isBooked = true;
      seat.dateFrom = dateFrom;
      seat.dateTo = dateTo;
      seat.empGmail = empGmail;
      seat.empName = empName;
      seat.bookingDateFrom = dateFrom;
      seat.bookingDateTo = dateTo;
      seat.updated_at = new Date();
      await seat.save();
      res.status(200).json({ message: 'Seat booked successfully',ok: true});
    }catch(e){
      console.error(e);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}
async function deleteSeat(req, res) { 
  seatNumber = req.body.seatNumber;
  try {
    const result = await Seat.deleteOne({ seatNumber: seatNumber });
    if (result.deletedCount === 0) {
      return { message: `Seat with number ${seatNumber} not found` };
    }
    return res.status(200).json({ message: `Seat with number ${seatNumber} deleted successfully` });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
// cancel seats
async function cancelSeat(req,res) {
  const seatNumber = req.body.seatNumber;
  try {
    const seat = await Seat.findOne({ seatNumber: seatNumber });
    if (!seat) {
      return { message: `Seat with number ${seatNumber} not found` };
    }
    seat.isBooked = false;
    seat.empGmail = null;
    seat.empName = null;
    seat.bookingDateFrom = null;
    seat.bookingDateTo = null;
    await seat.save();
    return res.status(200).json({ message: `Seat with number ${seatNumber} cancelled successfully`, ok: true });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error', ok: false });
  }
}


// add seats
async function addSeat(req,res) {
  const {seatNumber, isMonitorPresent} = req.body;
  try {
    const seat = new Seat({
      seatNumber: seatNumber,
      isBooked: false,
      rowNumber: Math.ceil(seatNumber/7),
      isMonitorPresent: req.body.isMonitorPresent,
      empGmail : null,
      empName : null,
      bookingDateFrom : null,
      bookingDateTo : null
    });
    await seat.save();
    return res.status(200).json({ message: `Seat with number ${seatNumber} added successfully` });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// get seats
const getSeats = async (req, res) => {
  try {
    //  get all seats
    const availableSeats = await Seat.find()
      .sort({ rowNumber: 1, seatNumber: 1 });
    return res.status(200).json({ availableSeats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

//  reset all seats to available
function populateDB(){
  NUM_ROWS = 12;
  NUM_SEATS_PER_ROW = 7;
  NUM_SEATS = NUM_ROWS * NUM_SEATS_PER_ROW;
  NUM_MONITORS = parseInt(NUM_SEATS *(0.3)); // 30 percent sys with monitor
  for (let i = 1; i <= NUM_SEATS; i++) {
      let seat = new Seat({
          seatNumber: i,
          isBooked: false,
          rowNumber: Math.floor(i / NUM_SEATS_PER_ROW) + 1,
          isMonitorPresent: (i<=NUM_MONITORS)
      });
      seat.save();
  }
  console.log("DB populated successfully");
}
const resetSeatsController = async (req, res) => {
  try {
    // Remove any existing seats data
    await Seat.deleteMany({});
    populateDB();
    return res.json({ message: 'data successfully reset' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


const isAdmin = async (req, res) => {
  const { email } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(200).json({ isAdmin: false });
  }
  return res.status(200).json({ isAdmin: true });
};


module.exports = { bookingController, resetSeatsController, getSeats, deleteSeat , cancelSeat, addSeat, isAdmin};
