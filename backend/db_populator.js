const connectionDB = require("./config/db");
const Seat  =  require('./models/seats.model');
const dotenv = require("dotenv");

dotenv.config();
connectionDB();

console.log("populating db");

function populateDB(){
    NUM_ROWS = 4;
    NUM_SEATS_PER_ROW = 5;
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

populateDB();

