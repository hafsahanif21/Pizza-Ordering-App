const mongoose = require("mongoose");
require("colors");

const connectDB = async () => {
  try {
    const url = "mongodb+srv://hirarizvi:Html5Css3@hira.trhky4w.mongodb.net/";
    const conn = await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(
      `Mongodb DataBase Connected! ${conn.connection.host}`.bgCyan.white
    );
  } catch (error) {
    console.log(`error: ${error.message}`.bgRed.white);
  }
};

module.exports = connectDB;


