const express = require('express');
const router = express.Router();
const passport = require("passport")
const UserModel = require("../models/userModel");
const { Passport } = require('passport');
const userModel = require('../models/userModel');


//getting the register form 

router.get('/register', (req, res) => { 
  res.render("register",{title:"register page"})
});
router.post('/register', async (req, res) => { 
  try {
  const user = new UserModel(req.body);
   console.log(req.body);
  let existingUser = await UserModel.findOne({Email:req.body.Email});
  if (existingUser){
    return res.status(400).send("Wrong Email")
  }else{
  const user = new UserModel(req.body);
    await UserModel.register(user,req.body.password,(error)=>{
      if (error){
        throw error;
      }
  res.redirect("/login")
    })
  }

  } catch (error) {
    res.status(400).send("Oops something went wrong")
  }
});

router.get('/login', (req, res) => { 
  res.render("login", { title: "login page" });
});

router.post(
  '/login',
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => { 
    console.log("Logged in user:", req.user); //  Add thi
    if(!req.user){
      return res.send("User not set in req.user");
    }

    req.session.user = req.user;

    if (req.user.role === "Manager") {
      res.redirect("/admin-dashboard");
    } else if (req.user.role === "Attendant") {
      res.redirect("/sales");
    } else {
      res.render("noneUser"); // must exist in views folder
    }
  }
);


// GET: Show all users from MongoDB
router.get("/userlist", async (req, res) => {
  try {
    const users = await userModel.find().lean(); // query MongoDB
    res.render("userList", { user: users }); // pass users to Pug
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Server error");
  }
})

// DELETE: Remove user from MongoDB
router.post("/users/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/userList"); // make sure this matches your pug route
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).send("Server error");
  }
});

router.get("/user-edit/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render("userEdit", { user });
});

// UPDATE USER
router.post("/users/update/:id", async (req, res) => {
  try {
    const { name, email, role } = req.body;

    await User.findByIdAndUpdate(req.params.id, {
      name,
      email,
      role,
    });

    res.redirect("/userList");
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).send("Server error");
  }
})


router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) return next(err);
    req.session.destroy((err) => {
      if (err) return res.status(500).send("Error logging out");
      res.clearCookie('connect.sid'); // Optional: clear cookie
      res.redirect('/');
    });
  });
});





router.get('/form', (req, res) => { 
  res.render("form",{title:"signup page"})
});
router.post('/form', (req, res) => { 
  console.log(req.body)
});



router.get('/admin-dashboard', (req, res) => { 
  res.render("admin-dashboard",{title:"admin-dashboard page"})
});
router.post('/admin-dashboard', (req, res) => { 
  console.log(req.body)
  res.redirect("/sales-entry")
});













module.exports = router