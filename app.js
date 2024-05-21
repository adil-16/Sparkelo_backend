const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const bodyParser = require("body-parser");

const user = require("./routes/userRoutes");
const app = express();

app.use(express.json());
app.use(cookieParser());


app.use(bodyParser.urlencoded({ extended: true }));

// Allow requests 
app.use(cors({
  origin: ['http://192.168.100.7:5174','http://localhost:5174'],
  credentials: true
}));
app.use("/api/v1", user);


//middleware for error
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);
module.exports = app