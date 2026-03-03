const jwt = require("jsonwebtoken");

const authDoctor = async (req, res, next) => {
  try {
    const token = req.headers.dtoken;
    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.docId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

module.exports = authDoctor;
