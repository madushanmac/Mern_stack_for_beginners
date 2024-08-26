const mongoose = require("mongoose");

const dburl =
  "mongodb+srv://madushan:1234@cluster0.d05o7qd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.set("strictQuery", true, "useNewUrlParser", true);

const connection = async () => {
  try {
    await mongoose.connect(dburl);
    console.log("MongoDB Connected~");
  } catch (e) {
    console.error(e.message);
    process.exit();
  }
};

module.exports = connection;
