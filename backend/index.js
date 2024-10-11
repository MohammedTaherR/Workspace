const express =  require("express");
const connectionDB = require("./config/db");
const seatsRoutes = require("./routes/seats.routes")
const dotenv = require("dotenv");
const { deleteSeat } = require('./controller/seats.controller');

const cors = require('cors');

const app = express();
app.use(cors());
dotenv.config();
connectionDB();
app.use(express.json());

app.get("/",(req, res)=>{
    console.log("unstop assignment");
})


//  seats routes
app.use("/api/seats", seatsRoutes);

// seats to cancel
app.post("/api/seats/cancel", (req, res) => {
    console.log("inside cancel");
    console.log(req.body);
    deleteSeat(req.body.seatNumber).then((result) => {
    console.log(result);
  }).catch((err) => {
    console.error(err);
  });
    res.send("success");
  });

const port = process.env.PORT || 8080;
app.listen(port, ()=>{ console.log(" server running at port = ", port) });