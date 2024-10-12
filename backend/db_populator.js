const connectionDB = require("./config/db");
const Seat = require('./models/seats.model');
const { Admins, Admin } = require('./models/admin.model');
const dotenv = require("dotenv");

dotenv.config();
connectionDB();

console.log("populating db");

async function populateSeatsDB() {
    NUM_ROWS = 4;
    NUM_SEATS_PER_ROW = 5;
    NUM_SEATS = NUM_ROWS * NUM_SEATS_PER_ROW;
    NUM_MONITORS = parseInt(NUM_SEATS * (0.3)); // 30 percent sys with monitor
    try {
        for (let i = 1; i <= NUM_SEATS; i++) {
            let seat = new Seat({
                seatNumber: i,
                isBooked: false,
                rowNumber: Math.floor(i / NUM_SEATS_PER_ROW) + 1,
                isMonitorPresent: (i <= NUM_MONITORS)
            });
            await seat.save();
        }
        return true;
    } catch (e) {
        console.error(`Error while populating db : ${e}`);
        return false;
    }
}

async function populateAdminUsersDB(admins = []) {
    if (admins.length == 0) {
        admins = [
            "sudhir.shanmugam@multicorewareinc.com"
        ]
    }
    try {

        for (let i = 0; i < admins.length; i++) {
            let admin = new Admin({
                email: admins[i]
            });
            await admin.save();
        }
        return true;
    } catch (e) {
        console.error(`Error while populating db : ${e}`);
        return false;
    }
}

(async () => {
    if (await populateSeatsDB() == true) {
        console.log(`DB populated successfully`);
    } else {
        console.error(`DB population failed`);
        process.exit();
    }
    if (await populateAdminUsersDB() == true) {
        console.log(`Admin populated successfully`);
        process.exit();
    } else {
        console.error(`Admin population failed`);
        process.exit();
    }
})();


