const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  name_en: { type: String, required: true },                 // English scheme name
  name_kn: { type: String, required: true },                 // Kannada scheme name
  description_en: { type: String, required: true },          // English combined description (objective + benefits)
  description_kn: { type: String, required: true },          // Kannada combined description
  objective_en: { type: String, required: false },           // English objective text (optional)
  objective_kn: { type: String, required: false },           // Kannada objective text (optional)
  benefits_en: { type: String, required: false },            // English benefits summary (optional)
  benefits_kn: { type: String, required: false },            // Kannada benefits summary (optional)
  eligibility: { type: String, required: false },            // Eligibility criteria, if any
  required_documents: [{ type: String }],                     // Array of strings for documents required
  benefits: [{ type: String }],                               // Array of strings listing benefits individually (optional)
  category: { type: String, required: true },                 // Category like agriculture, entrepreneurship, etc.
  target_audience: [{ type: String }],                        // Array of target audiences like farmers, entrepreneurs
  state: { type: String, required: false },                   // Optional state information
  link: { type: String, required: false }                     // URL link for scheme application/info
});

module.exports = mongoose.model('Scheme', schemeSchema);
