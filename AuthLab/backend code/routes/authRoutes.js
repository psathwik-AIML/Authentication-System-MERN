const express = require("express");
const { googleLogin, getProfile } = require("../controllers/authControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/google", googleLogin);
router.get("/profile", protect, getProfile);

module.exports = router;
