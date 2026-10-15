const { OAuth2Client } = require("google-auth-library");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const axios = require("axios");
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
    let existUser = await User.findOne({ email });
    // console.log("exi :", existUser);
    if (!existUser) {
      existUser = await User.create({
        name,
        email,
        provider: "google",
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
// profile
const getProfile = async (req, res) => {
  res.json(req.user);
};
// github
const githubLogin = (req, res) => {
  const githubURL = `http://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user:email`;
  res.redirect(githubURL);
};
// github callback
const githubCallback = async (req, res) => {
  try {
    const tempCode = req.query.code;
    // console.log("code :", tempCode);
    if (!tempCode) {
      return res.status(404).json({ message: "code not found" });
    }
    // verification
    const tokenRequest = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: tempCode,
      },
      {
        headers: {
          Accept: "application/json",
        },
      },
    );
    // console.log("token response :", tokenRequest.data);
    const accessToken = tokenRequest.data.access_token;
    console.log("tokkkk :", accessToken);
    if (!accessToken) {
      return res.status(404).json({ message: "token not found" });
    }
    // user request
    const userReq = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log("user response :", userReq.data);
    const user = userReq.data.name || userReq.data.login;
    // emial request
    const emailReq = await axios.get("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log("email response :", emailReq.data);
    const emailDetails = emailReq.data.find(
      (eachEmail) => eachEmail.primary === true,
    );
    const email = emailDetails.email;
    // console.log("email :", email);
    // find user in data base
    let existUser = await User.findOne({ email });
    // store in database
    if (!existUser) {
      existUser = await User.create({
        name: user,
        email,
        provider: "github",
        githubId: userReq.data.id.toString(),
      });
    }
    // generate token
    const generatedToken = jwt.sign(
      { userID: existUser._id },
      process.env.JWT_KEY,
    );
    res.redirect(
      `http://localhost:5173/github-success?token=${generatedToken}`,
    );
  } catch (err) {
    return res
      .status(500)
      .json({ message: "error in github callback", errorMsg: err.message });
  }
};

// http://localhost:3000/api/auth/github/callback

module.exports = { googleLogin, getProfile, githubLogin, githubCallback };
