const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
     trim: true
 },
  quantity: {
     type: Number,
      required: true
     },
  price: {
     type: Number,
     required: true
     }
});

module.exports = mongoose.model('Stock', stockSchema);
