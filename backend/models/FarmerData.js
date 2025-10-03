const mongoose = require('mongoose');

const FarmerDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },

  // Land details
  landRecords: { type: String, required: true },
  landArea: { type: Number, required: true },
  rtcDetails: { type: String },
  cropInfo: { type: String, required: true },
  cultivationMethod: { type: String, required: true },
  irrigationType: { 
    type: String, 
    enum: ['Rainfed', 'Well', 'Borewell', 'Canal', 'Tank', 'others'], 
    required: true 
  },

  // Identity & document uploads
  landImage: { type: String }, // Single file
  idDocuments: [{ type: String }], // Multiple files (Aadhaar, PAN, Ration)
  homePhotos: [{ type: String }], // Multiple home photos

  // Personal IDs
  aadhaarNumber: { type: String, required: true, maxlength: 12 },
  panNumber: { type: String, maxlength: 10 },
  rationCardNumber: { type: String },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update `updatedAt` on save
FarmerDataSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('FarmerData', FarmerDataSchema);
