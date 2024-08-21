const mongoose = require('mongoose');

const dbConnect = () => {
  mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
}

module.exports = dbConnect;
