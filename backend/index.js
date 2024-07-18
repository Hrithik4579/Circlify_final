const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app=express();
const authRoutes = require("./routes/userRoutes");
const messageRoutes=require("./routes/messageRoutes");
require("dotenv").config();

app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT,() =>
    console.log(`Server started on ${process.env.PORT}`)
);
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);