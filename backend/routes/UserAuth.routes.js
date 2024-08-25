const express = require("express");
const router = express.Router();
const {
  sendmailAndsaveData,
  verifyEmail,
  setupPassword,
  signin,
  userAddress,
  getUserWithAddresses,
  OAuth,
  OAuthLogin,
  getAddress,
  editUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controller/UserAuth.controller");
const adminMiddleware = require("../middleware/adminMiddleware");

// Public routes
router.post("/verifyMail", sendmailAndsaveData);
router.get("/verify-email", verifyEmail);
router.post("/setup-password", setupPassword);
router.post("/signin", signin);
router.post("/oAuth", OAuth);
router.post("/oAuthLogin", OAuthLogin);

// User routes
router.post("/userAddress", userAddress);
router.get("/getUser", getUserWithAddresses);
router.post("/getaddress/:id", getAddress);

// Admin routes
router.put("/edit-user", editUser);
router.get("/users", getAllUsers);
router.put("/update-user", updateUser);
router.delete("/delete-user/:id", deleteUser);

// Protected admin route example
router.get("/admin", adminMiddleware, (req, res) => {
  res.status(200).json({ message: "Welcome to the admin panel." });
});

module.exports = router;
