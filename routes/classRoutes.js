const express = require('express');
const router = express.Router();
const path = require("path");

//snytax of a route(app.METHOD(PATH, HANDLER);)
// Simple request time logger
// app.use((req, res, next) => {
//    console.log("A new request received at " + Date.now());

   // This function call tells that more processing is
   // required for the current request and is in the next middleware
  //  function/route handler.
//    next();  
// });

// app.use((req, res, next) => {
//   console.log('A new request received at ' + Date.now());
//   next();
// });

router.get('/home', (req, res) => { 
  res.send("This is Desire's page. ");
});
// app.post('/about' ,(req,res) =>{
//   res.send("this is my lovely page")
// }
// );
//TODO this functio
router.get('/about', (req, res) => { 
  res.send("This is my lovely page ");
});
router.delete('/user' ,(req,res) =>{
  res.send("Got a DELETE request at /user")
});
//Path parameters and query strings
//path params(Routing Parameters)
router.get('/pathparams/:userName', (req,res) =>{
  res.send("This is the userName" + req.params.userName)

}

);
//query strings
router.get('/users', (req,res) =>{
  res.send("This is " + req.query.name + ' from attendants ' + req.query.attendants + 'users' + req.query.users + 'she is' + req.query.gender)

}

);
 

//serving html files
// router.get('/', (req, res) => { 
//   res.sendFile(__dirname + '/html/index.html');
// });

//serving html files
//be able to get the form
router.get('/submit', (req, res) => { 
  res.sendFile(path.join(__dirname + '/html/form.html'));
});

//post route
router.post('/submit', (req, res) => { 
  console.log(req.body)
});

router.get('/register1', (req, res) => { 
  res.sendFile(__dirname + '/html/register.html');
});
router.post('/register1', (req, res) => { 
  console.log(req.body)
});

// router.get('/update-stock', (req, res) => { 
//   res.sendFile(__dirname + '/html/stock.html');
// });
// router.post('/update-stock', (req, res) => { 
//   console.log(req.body)
// });


//post route
// router.post('/submit', (req, res) => {
//   const { name, email, message } = req.body;
//   console.log(name, email, message);
//   res.send("Form data received!");
// });

module.exports = router
