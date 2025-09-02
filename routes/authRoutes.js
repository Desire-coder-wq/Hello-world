const express = require('express');
const router = express.Router();



//getting the register form 

router.get('/register', (req, res) => { 
  res.render("register",{title:"register page"})
});
router.post('/register', (req, res) => { 
  console.log(req.body)
});


router.post('/stock', (req, res) => { 
  res.render("stock",{title:"stock page"})
});

router.get('/index', (req, res) => { 
  res.render("index",{title:"home page"})
});
router.get('/form', (req, res) => { 
  res.render("form",{title:"signup page"})
});
router.post('/form', (req, res) => { 
  console.log(req.body)
});
















module.exports = router