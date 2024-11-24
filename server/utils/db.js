const mongoose = require('mongoose')
const db = async () => {
    const dbURI = "mongodb://localhost:27017/Authentication"; // Connection URI
    try {
      await mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB Database");
    } catch (err) {
      console.log("Database connection error:", err);
    }
  };
  
  // Call the connection function
  db();