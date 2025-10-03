// // backend/config/multerConfig.js

// const multer = require('multer');
// const path = require('path');

// // Set storage engine
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Store all files in a single 'uploads' folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   },
// });

// // Check file type
// function checkFileType(file, cb) {
//   // Allowed ext: jpeg, jpg, png, gif, pdf, doc, docx
//   const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb('Error: Images, PDFs, and Documents Only!');
//   }
// }

// // Init upload. The names below MUST match the 'name' attributes in your frontend forms.
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
//   fileFilter: (req, file, cb) => {
//     checkFileType(file, cb);
//   },
// }).fields([
//   { name: 'landImage', maxCount: 1 },
//   { name: 'idDocuments', maxCount: 1 },
//   { name: 'homePhotos', maxCount: 1 },
//   // Add other file fields here for the Entrepreneur Dashboard
//   { name: 'aadhaarImage', maxCount: 1 },
//   { name: 'panImage', maxCount: 1 },
//   { name: 'businessRegistrationDoc', maxCount: 1 },
// ]);

// module.exports = upload;


// backend/config/multerConfig.js

const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure this 'uploads/' folder exists in your backend root!
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    // Creates unique filename: fieldname-timestamp.ext
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Check file type
function checkFileType(file, cb) {
  // Allowed ext: jpeg, jpg, png, gif, pdf, doc, docx
  const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images, PDFs, and Documents Only!');
  }
}

// Init upload: Exports the configured Multer instance (without .fields() call)
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

// ✅ CORRECT EXPORT: Export the Multer instance directly
module.exports = upload;