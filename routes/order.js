const express = require("express");

const router = express.Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Order = require("../models/Order");

// Create a Order
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update an Order
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a Cart
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get User Order
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.findOne({ id: req.params.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});
// Get a all orders of all users
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get monthly income
router.get('/income',verifyTokenAndAdmin,async(req,res)=>{
    
})

module.exports = router;
