const jwt = require("jsonwebtoken");

//doctor authenication middleware
const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    if (!dtoken) {
      return res.json({
        success: false,
        message: "token not present ",
      });
    }

    // verify token

    // decode the token
    const decodeToken = jwt.verify(dtoken, process.env.JWT_SECRET);
    // console.log(decodeToken);

    req.docId = decodeToken.id;
    console.log(decodeToken.id);
    next();
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
      text: "authDoctor catch  block",
    });
  }
};
module.exports = authDoctor;

// --------------------------
