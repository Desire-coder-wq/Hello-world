// 1.//Dependencies
const express = require('express');
const path = require('path');

//Import routes
const classRoutes = require("./routes/classRoutes");
const authRoutes = require("./routes/authRoutes");
// 2.//Instantiations
const app = express();

const port =3000;

// 3.//Configurations
app.set('view engine','pug')
app.set('views', path.join(__dirname, 'views'));

// //routing (a path to something)
// app.get('/', (req, res) => { 
//   res.send('Homepage! Hello world.');
// });

// 4.//Middleware
// app.use(express.static('public'));

app.use(express.static(path.join(__dirname,'public')));

//middle ware to parse form data and jason
app.use(express.urlencoded({extended:true})) // helps to pass data from forms

//using imported routes
// 5.//Routes
 app.use('/',classRoutes);
 app.use('/',authRoutes);







 
//non existing  route handler
app.use((req,res)=>{
  res.status(404).send('Oops! Route not found')
}
)

// 6.//Bootstrapping Server
//this should always be the last line in this file.
app.listen(port, () => {
  console.log(`listening on port ${port}`)
});



