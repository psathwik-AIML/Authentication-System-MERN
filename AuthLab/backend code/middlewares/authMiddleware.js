const jwt = require("jsonwebtoken");
const User = require("../models/user");
const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Un- authorized user",
        error: err.message,
      });
    }
    const decode = await jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(decode.userID);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Token Not Verified",
      error: err.message,
    });
  }
};

module.exports = protect;
