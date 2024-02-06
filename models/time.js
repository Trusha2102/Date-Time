const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
  enteredTime: {
    type: Date,
    required: true
  },
  convertedTime: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Time', timeSchema);
