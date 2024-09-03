const express = require('express');
const { getDashboardData } = require('../controller/AdminDashboard');
const router = express.Router();

router.get('/dashboard', getDashboardData);

module.exports = router;
