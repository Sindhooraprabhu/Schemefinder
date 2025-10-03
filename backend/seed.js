const mongoose = require('mongoose');
const path = require('path');
const xlsx = require('xlsx');
const Scheme = require('./models/Scheme');

const dbURI = 'mongodb://localhost:27017/govschemes';

const farmersFilePath = path.join(__dirname, 'farmer.xlsx');
const startupsFilePath = path.join(__dirname, 'startup.xlsx');

// Utility to get a value from row ignoring key case and trimming spaces
const getValue = (row, key) => {
  const foundKey = Object.keys(row).find(k => k.trim().toLowerCase() === key.trim().toLowerCase());
  return foundKey ? row[foundKey] : undefined;
};

// Helper builds full description
const buildDescription = (row) => {
  const objective = getValue(row, 'Objective') ? getValue(row, 'Objective').toString().trim() : '';
  const benefits = getValue(row, 'Key Benefits') ? getValue(row, 'Key Benefits').toString().trim() : '';
  return [objective, benefits].filter(Boolean).join(' | ') || 'No description available.';
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('MongoDB connected for seeding...');

    // Read farmer schemes Excel
    const farmersWorkbook = xlsx.readFile(farmersFilePath);
    const farmerSheetName = farmersWorkbook.SheetNames[0];
    const farmerSchemesData = xlsx.utils.sheet_to_json(farmersWorkbook.Sheets[farmerSheetName]);

    // Debug: print keys in first row of farmer data
    if (farmerSchemesData.length > 0) {
      console.log('Farmer sheet keys:', Object.keys(farmerSchemesData[0]));
    }

    // Read startup schemes Excel
    const startupsWorkbook = xlsx.readFile(startupsFilePath);
    const startupSheetName = startupsWorkbook.SheetNames[0];
    const startupSchemesData = xlsx.utils.sheet_to_json(startupsWorkbook.Sheets[startupSheetName]);

    // Debug: print keys in first row of startup data
    if (startupSchemesData.length > 0) {
      console.log('Startup sheet keys:', Object.keys(startupSchemesData[0]));
    }

    // Map farmer schemes
    const farmers = farmerSchemesData.map(row => ({
      name_en: getValue(row, 'Scheme Name') ? getValue(row, 'Scheme Name').toString().trim() : 'N/A',
      name_kn: 'ಕನ್ನಡದಲ್ಲಿ ಲಭ್ಯವಿಲ್ಲ',
      description_en: buildDescription(row),
      description_kn: 'ವಿವರಣೆ ಲಭ್ಯವಿಲ್ಲ',
      objective_en: getValue(row, 'Objective') ? getValue(row, 'Objective').toString().trim() : 'No objective available.',
      objective_kn: 'ಯಾವುದೇ ಉದ್ದೇಶ ಲಭ್ಯವಿಲ್ಲ.',
      benefits_en: getValue(row, 'Key Benefits') ? getValue(row, 'Key Benefits').toString().trim() : 'No benefits available.',
      benefits_kn: 'ಯಾವುದೇ ಪ್ರಯೋಜನಗಳು ಲಭ್ಯವಿಲ್ಲ.',
      category: 'agriculture',
      target_audience: ['farmers'],
    }));

    // Map startup schemes
    const startups = startupSchemesData.map(row => ({
      name_en: getValue(row, 'Scheme Name') ? getValue(row, 'Scheme Name').toString().trim() : 'N/A',
      name_kn: 'ಕನ್ನಡದಲ್ಲಿ ಲಭ್ಯವಿಲ್ಲ',
      description_en: buildDescription(row),
      description_kn: 'ವಿವರಣೆ ಲಭ್ಯವಿಲ್ಲ',
      objective_en: getValue(row, 'Objective') ? getValue(row, 'Objective').toString().trim() : 'No objective available.',
      objective_kn: 'ಯಾವುದೇ ಉದ್ದೇಶ ಲಭ್ಯವಿಲ್ಲ.',
      benefits_en: getValue(row, 'Key Benefits') ? getValue(row, 'Key Benefits').toString().trim() : 'No benefits available.',
      benefits_kn: 'ಯಾವುದೇ ಪ್ರಯೋಜನಗಳು ಲಭ್ಯವಿಲ್ಲ.',
      category: 'entrepreneurship',
      target_audience: ['entrepreneurs'],
    }));

    const allSchemes = [...farmers, ...startups];

    if (allSchemes.length > 0) {
      await Scheme.deleteMany({});
      await Scheme.insertMany(allSchemes);
      console.log(`✅ Database seeded with a total of ${allSchemes.length} schemes successfully.`);
    } else {
      console.log('⚠️ No schemes found in the XLSX files.');
    }

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedDatabase();
