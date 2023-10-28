const mongoose = require("mongoose");

const connectDB = (url) =>{
    mongoose
  .connect(url)
  .then(() => {
    console.log("DataBase connection successful");
  })
  .catch(() => {
    console.log("Error connecting to DataBase");
  });
}


module.exports = connectDB