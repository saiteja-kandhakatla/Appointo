const jwt = require("jsonwebtoken");

//admin authenication middleware
const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res.json({
        success: false,
        text: "IN token",
        message: "Now authorized login again",
      });
    }

    // verify token

    // decode the token
    const decodeToken = jwt.verify(atoken, process.env.JWT_SECRET);
    const key = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;
    // console.log("Key in authadmin: ", key);
    if (decodeToken !== key) {
      return res.json({
        success: false,
        text: "Not a valid email",
        message: "Not Authorized login again",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message, text: "error block" });
  }
};
module.exports = authAdmin;

// --------------------------
