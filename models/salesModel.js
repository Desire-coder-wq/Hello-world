const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  salesAgent: {
     type: String,
      required: true
     },
  customer: {
     type: String, 
     required: true 
    },
  productId: { 
    type: String,
     required: true 
    },
  quantity: {
     type: Number,
     required: true 
    },
  price: { 
    type: Number, 
    required: true 
  }, // unit price
  transport: { 
    type: String,
     required: true
     },
  payment: { 
    type: String,
     required: true 
    },
  discount: { 
    type: String,
     default: false
     },
  date: { 
    type: Date,
     required: true
     }
});


module.exports = mongoose.model("SalesModel", salesSchema);
