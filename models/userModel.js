const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const registerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true

   },
  email: {
    type: String,
    required: true,
    trim: true
  },

  role:{
    type: String,       // Change 'string' to 'String'
    required: true
  }
});
// Export Model
registerSchema.plugin(passportLocalMongoose,{
  usernameField:"email"
});
module.exports = mongoose.model('UserModel', registerSchema);
