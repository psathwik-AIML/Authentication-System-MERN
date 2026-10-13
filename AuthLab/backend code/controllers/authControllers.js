const { OAuth2Client } = require("google-auth-library");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
// client creation
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// google
const googleLogin = async (req, res) => {
  try {
    // token from frontend
    const { token } = req.body;
    // verification by google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    //   data recieved from google
    const payload = ticket.getPayload();
    const { sub, email, name } = payload;
    console.log("payload:", payload);
    // check user existing or not
    const existUser = await User.findOne({ email });
    if (!existUser) {
      User.create({
        name,
        email,
        googleId: sub,
      });
    }
    // send jwt token to frontend
    const jwtToken = jwt.sign({ userID: existUser._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });
    res.json({
      success: true,
      token: jwtToken,
      message: "Google auth working",
      body: req.body,
    });
  } catch (err) {
    res.status(500).json({
      message: "something went wrong in google login",
      error: err.message,
    });
  }
};

const getProfile = async (req, res) => {
  res.json(req.user);
};
module.exports = { googleLogin, getProfile };
