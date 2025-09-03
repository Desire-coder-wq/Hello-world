const express = require('express');
const router = express.Router();



//getting the register form 

router.get('/register', (req, res) => { 
  res.render("register",{title:"register page"})
});
router.post('/register', (req, res) => { 
  console.log(req.body)
  res.redirect("/login")
});

router.get('/login', (req, res) => { 
  res.render("login",{title:"login page"})
});
router.post('/login', (req, res) => { 
  console.log(req.body)
  res.redirect("/stock")
});



router.get('/form', (req, res) => { 
  res.render("form",{title:"signup page"})
});
router.post('/form', (req, res) => { 
  console.log(req.body)
});
















module.exports = router