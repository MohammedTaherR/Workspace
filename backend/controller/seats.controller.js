// controller.js
const Seat = require('../models/seats.model');

// // Controller function to book seats
// const bookingController = async (req, res) => {
//   const { numOfSeats } = req.body;
//   if (numOfSeats > 7) {
//     return res.status(400).json({ message: 'Not able to book more than 7 seats' });
//   }

//   try {

//     //  get available seats
//     const availableSeats = await Seat.find({ isBooked: false })
//       .sort({ rowNumber: 1, seatNumber: 1 });

//     // if not enough seats available
//     if (availableSeats.length < numOfSeats) {
//       return res.status(500).json({ message: `Booking failed, Only ${availableSeats.length} seats available to book.` });
//     }

//     const rowCount = 12;

//     // booked seats in same row
//     for (let row = 1; row <= rowCount; row++) {
//       const rowSeats = availableSeats.filter(seat => seat.rowNumber === row);
//       const falseCount = rowSeats.reduce((count, seat) => count + (!seat.isBooked ? 1 : 0), 0);
//       if (falseCount >= numOfSeats) {
//         const availableToBook = rowSeats.filter(seat => !seat.isBooked).slice(0, numOfSeats);
//         for (let i = 0; i < availableToBook.length; i++) {
//           const seat = availableToBook[i];
//           seat.isBooked = true;
//           await seat.save();
//         }
//         return res.status(200).json({ data: availableToBook });
//       }
//     }

//     // book seats in different nearby row, only if not available in same row

//     // find a array for total number of available seats in each row
//     let arr = [];
//     for (let row = 1; row <= rowCount; row++) {
//       const rowSeats = availableSeats.filter(seat => seat.rowNumber === row);
//       const falseCount = rowSeats.reduce((count, seat) => count + (!seat.isBooked ? 1 : 0), 0);
//       arr.push(falseCount);
//     }

    
//     // variables user in below logic
//     let minLength = Infinity;
//     let minStart = -1;
//     let minEnd = -1;
//     let start = 0;
//     let end = 0;
//     let sum = 0;


//     //  find nearby rows
//     while (end < arr.length) {
//       sum += arr[end];

//       while (sum >= numOfSeats) {
//         let length = end - start + 1;
//         if (length < minLength) {
//           minLength = length;
//           minStart = start;
//           minEnd = end;
//         }
//         sum -= arr[start];
//         start++;
//       }
//       end++;
//     }


//     // final array to update
//     let finalArray = []
//     for (let row = minStart + 1; row <= minEnd + 1; row++) {
//       const rowSeats = availableSeats.filter(seat => { if (seat.rowNumber === row) { finalArray.push(seat) } });
//     }
//     finalArray = finalArray.slice(0, numOfSeats)

//     // update seats in nearby row
//     for (let i = 0; i < finalArray.length; i++) {
//       const seat = finalArray[i];
//       seat.isBooked = true;
//       await seat.save();
//     }

//     // send response if nearby seats booking done
//     if (finalArray) {
//       return res.status(200).json({ data: finalArray });
//     }

//     // if booking failed
//     return res.status(500).json({ message: 'Booking failed' });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };


// Controller function to book seats
/*
  {
    seatNumber, 
        EID,
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
async function deleteSeat(seatNumber) {
  try {
    const result = await Seat.deleteOne({ seatNumber: seatNumber });
    if (result.deletedCount === 0) {
      return { message: `Seat with number ${seatNumber} not found` };
    }
    return { message: `Seat with number ${seatNumber} deleted successfully` };
  } catch (err) {
    return { message: 'Internal Server Error' };
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



module.exports = { bookingController, resetSeatsController, getSeats, deleteSeat };
