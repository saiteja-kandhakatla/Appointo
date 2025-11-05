const jwt = require("jsonwebtoken");

//user authenication middleware
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "token not present ",
      });
    }

    // verify token

    // decode the token
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decodeToken);

    req.userId = decodeToken.id;
    next();
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
      text: "authUser catch  block",
    });
  }
};
module.exports = authUser;

// --------------------------
