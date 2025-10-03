// backend/models/EntrepreneurData.js
const mongoose = require('mongoose');

const EntrepreneurDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // Ensures one entrepreneur has one data entry
  },
  businessName_en: { type: String, required: true },
  businessName_kn: { type: String, required: true },
  businessType_en: { type: String, required: true }, // e.g., Retail, Manufacturing, Service
  businessType_kn: { type: String, required: true },
  registrationId: { type: String, unique: true, sparse: true }, // e.g., Udyam Registration, GSTIN
  businessAddress_en: { type: String },
  businessAddress_kn: { type: String },
  investmentAmount: { type: Number, min: 0 },
  investmentCurrency: { type: String, default: 'INR' },
  requiredLicenses_en: { type: String }, // e.g., Trade License, FSSAI
  requiredLicenses_kn: { type: String },
  businessPlan_en: { type: String }, // Detailed description of business plan
  businessPlan_kn: { type: String },
  
  // Documents
  businessDocuments: [{ // Registration, Licenses, GST etc.
    fileName: String,
    filePath: String,
    fileType: String,
    documentType: { type: String, enum: ['registration', 'license', 'gstin', 'pan', 'other'] },
    uploadDate: { type: Date, default: Date.now }
  }],
  businessPhotos: [{ // Office, shop, product photos
    fileName: String,
    filePath: String,
    fileType: String,
    uploadDate: { type: Date, default: Date.now }
  }],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EntrepreneurData', EntrepreneurDataSchema);