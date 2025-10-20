const multer = require("multer");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    // console.log("Multer is processing the file:", file.originalname);
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
module.exports = upload;
