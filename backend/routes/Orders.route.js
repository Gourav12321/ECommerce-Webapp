const express = require('express');
const { getAllOrders,updateOrderDeliveryStatus,deleteOrder, getOrdersByUser, addOrder, updateOrderStatus, createPaymentIntent, generatePdfReceipt } = require('../controller/Orders.controller');
const router = express.Router();

router.post('/add', addOrder);
router.get('/user/:email', getOrdersByUser);
router.post('/payment', createPaymentIntent);
router.post('/update-status', updateOrderStatus);
router.get('/admin/orders', getAllOrders);
router.post('/admin/orders/update-status', updateOrderDeliveryStatus);
router.delete('/admin/orders/delete', deleteOrder);
router.post('/generate-pdf', generatePdfReceipt);

module.exports = router;
