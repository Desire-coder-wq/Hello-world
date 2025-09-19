require("dotenv").config();


// 1.//Dependencies

const express = require("express");
const morgan = require("morgan");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const passport = require("passport");
const path = require("path");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const moment = require("moment")

//import model
const UserModel = require("./models/userModel");
const Stock = require("./models/stockModel"); // needed for real-time updates

//Import routes
const classRoutes = require("./routes/classRoutes");
const authRoutes = require("./routes/authRoutes");
const stockRoutes = require("./routes/stockRoutes");
const indexRoutes = require("./routes/indexRoutes");
const salesRoutes = require("./routes/salesRoutes");
const reportRoutes = require("./routes/reportRoutes"); // NEW for stock report

// 2. Instantiations
const app = express();
const PORT = process.env.PORT || 3000; //  consistent naming



// 3.//Configurations
// settingup mongodb connections
mongoose.connect(process.env.MONGODB_URL, {
   autoIndex: true, 
  // useNewUrlParser: true,
  // useUnifiedTopology: true
});

mongoose.connection
  .on('open', () => {
    console.log('Sucessfully connected to mongoose');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });
// setting view engine to pug 
app.set('view engine','pug')
app.set('views', path.join(__dirname, 'views'));

//routing (a path to something)
// app.get('/', (req, res) => { 
//   res.send('Homepage! Hello world.');
// });

// 4.//Middleware
// app.use(express.static('public'));
// method override
app.use(methodOverride('_method'));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,'public')));
//middle ware to parse form data and jason
app.use(express.urlencoded({extended:true})) // helps to pass data from forms
app.use(express.json());

 //expression session configs
app.use(expressSession({
secret: process.env.SESSION_SECRET,
resave:false,
saveUninitialized: false,
store:MongoStore.create({mongoUrl:process.env.MONGODB_URL}),
cookie:{maxAge:24*60*60*1000}//oneday
}))

// passpor configs
app.use(passport.initialize()) //looks out passport.authenticate
app.use(passport.session()) //connects passort to the session created by 

 //authenticate  with passport localstrategy
passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());


//using imported routes
// 5.//Routes
 app.use('/',authRoutes);
 app.use('/',stockRoutes);
 app.use('/',indexRoutes);
 app.use('/',salesRoutes);
 app.use('/', reportRoutes); // NEW API endpoint for stock report



 
//non existing  route handler
app.use((req,res)=>{
  res.status(404).send('Oops! Route not found')
}
)





// 7.//Bootstrapping Server
//this should always be the last line in this file.
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});



