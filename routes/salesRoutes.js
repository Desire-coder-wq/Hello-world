const express = require('express');
const router = express.Router();
const salesModel = require('../models/salesModel'); // adjust path

// GET all sales and render page
router.get('/sales', async (req, res) => {
  try {
    const sales = await salesModel.find();
    res.render("sales", { title: "Sales Entry", sales });
  } catch (err) {
    console.error("Error fetching sales:", err.message);
    res.status(500).send("Error fetching sales");
  }
});

// POST new sale
router.post('/sales', async (req, res) => {
  try {
    const sale = new salesModel(req.body);
    const savedSale = await sale.save();

    console.log("Saved sale:", savedSale);

    // Fetch all sales after saving to render updated table
    const sales = await salesModel.find();
    res.render("sales", { title: "Sales Entry", sales });
    
  } catch (err) {
    console.error("Save error:", err.message);
    res.status(400).send("Error saving sale: " + err.message);
  }
});

module.exports = router;
