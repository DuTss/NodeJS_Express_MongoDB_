const path = require('path');
const multer = require('multer');

const UPLOAD_PATH = path.resolve(__dirname, '../', 'public/uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  dest: UPLOAD_PATH,
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (/^image\//.test(file.mimetype)) {
      callback(null, true);
    } else {
      console.log("Seuls les fichiers d'image sont autorisés");
      callback(null, false);
    }
  }
});

module.exports = upload;
