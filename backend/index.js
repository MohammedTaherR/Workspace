const express =  require("express");
const connectionDB = require("./config/db");
const seatsRoutes = require("./routes/seats.routes")
const adminsRoutes = require("./routes/admin.routes")
const dotenv = require("dotenv");
const cors = require('cors');

const app = express();
app.use(cors());
dotenv.config();
connectionDB();
app.use(express.json());

app.get("/",(req, res)=>{
    console.log("unstop assignment");
})

app.use("/api/seats", seatsRoutes);
app.use("/api/admin", adminsRoutes);

const port = process.env.PORT || 8080;
app.listen(port, ()=>{ console.log(" server running at port = ", port) });