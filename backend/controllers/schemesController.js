const Scheme = require('../models/Scheme');

// GET Dashboard Data (specific to user role)
exports.getPopularSchemes = async (req, res) => {
  try {
    // Fetches all schemes from the database, then limits to 4.
    const schemes = await Scheme.find().limit(4);
    res.json(schemes);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: err.message });
  }
};

exports.getFarmerSchemes = async (req, res) => {
  try {
    // Correctly queries the database for schemes with the 'farmers' target audience.
    const schemes = await Scheme.find({ target_audience: 'farmers' }).limit(4);
    res.json(schemes);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: err.message });
  }
};

exports.getEntrepreneurSchemes = async (req, res) => {
  try {
    // Correctly queries the database for schemes with the 'entrepreneurs' target audience.
    const schemes = await Scheme.find({ target_audience: 'entrepreneurs' }).limit(4);
    res.json(schemes);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: err.message });
  }
};

exports.searchSchemes = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    if (!searchQuery) {
      return res.status(400).json({ message: 'Search query is required.' });
    }
    const searchRegex = new RegExp(searchQuery, 'i');
    const schemes = await Scheme.find({
      $or: [
        { name_en: { $regex: searchRegex } },
        { name_kn: { $regex: searchRegex } },
        { description_en: { $regex: searchRegex } },
        { description_kn: { $regex: searchRegex } },
      ]
    }).limit(10);
    res.json(schemes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getSchemeById = async (req, res) => {
  try {
    const { id } = req.params;
    const scheme = await Scheme.findById(id);

    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }

    res.json(scheme);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// New function to get all schemes
exports.getAllSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find({});
 console.log('Schemes found:', schemes.length)
    res.json(schemes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};