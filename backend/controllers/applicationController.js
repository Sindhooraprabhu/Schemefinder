const Application = require('../models/Application');

exports.submitApplication = async (req, res) => {
  try {
    // Get userId from JWT (set by auth middleware)
    const userId = req.user.id;  // <-- Correct way

    // Destructure other fields from frontend
    const { schemeId, formData } = req.body;

    // Validate required fields
    if (!schemeId) {
      return res.status(400).json({ message: 'Scheme ID is required.' });
    }

    // Create new application document
    const newApplication = new Application({
      userId,
      schemeId,
      submittedData: formData || {},
    });

    // Save to DB
    await newApplication.save();

    // Send response
    res.status(201).json({
      message: 'Application submitted successfully.',
      applicationId: newApplication._id,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' }); // Always send JSON
  }
};
