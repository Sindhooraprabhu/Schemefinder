// backend/controllers/downloadController.js

const path = require('path');
const fs = require('fs');

exports.downloadFile = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '..', 'uploads', filename);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Could not download the file.');
      }
    });
  } else {
    res.status(404).send('File not found.');
  }
};