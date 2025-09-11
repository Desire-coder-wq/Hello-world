const express = require('express');
const router = express.Router();

const Stock = require("../models/stockModel");

// GET: Render stock entry form
router.get('/stock', (req, res) => { 
  res.render("stock", { title: "Stock Page" });
});

// POST: Save stock to DB, then redirect to stockList
router.post('/stock', async (req, res) => { 
  try {
    console.log("Received data:", req.body);
    const stock = new Stock(req.body);
    await stock.save();
    console.log("Saved stock:", stock);

    // go straight to stockList after saving
    res.redirect("/stockList");
  } catch (error) {
    console.error("Error saving stock:", error);
    res.redirect("/stock");
  }
});

// GET: List all stock items (render with Pug)
router.get("/stockList", async (req, res) => {
  try {
    const stock = await Stock.find().sort({$natural:-1});  // fetch from MongoDB  // stockModel.find().sort({$natural:-1});
    res.render("stockList", { stock });
  } catch (err) {
    console.error("Error fetching stock:", err);
    res.status(500).send("Server error");
  }
});




router.get('/manager', (req, res) => { 
  res.render("manager",{title:"manager-dashboard page"})
});
router.post('/manager', (req, res) => { 
  console.log(req.body)

});

module.exports = router