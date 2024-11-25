const express = require('express');
const { createAOrder, getOrderByEmail, deleteOrder, getAllOrders } = require('./order.controller');

const router = express.Router();

// Create order endpoint
router.post("/", createAOrder);

// Get orders by user email
router.get("/email/:email", getOrderByEmail);

// Delete order by ID
router.delete("/:id", deleteOrder);

// Fetch all orders
router.get("/order", getAllOrders);

module.exports = router;
