const express = require("express");
const {
  googleLogin,
  getProfile,
  githubLogin,
  githubCallback,
} = require("../controllers/authControllers");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/google", googleLogin);
router.get("/profile", protect, getProfile);
router.get("/github", githubLogin);
router.get("/github/callback", githubCallback);

module.exports = router;
