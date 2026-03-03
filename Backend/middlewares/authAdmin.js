const jwt = require("jsonwebtoken");

const authAdmin = async (req, res, next) => {
  try {
    const token = req.headers.atoken;
    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const adminKey = `${process.env.ADMIN_EMAIL}${process.env.ADMIN_PASSWORD}`;

    if (decoded !== adminKey) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

module.exports = authAdmin;
