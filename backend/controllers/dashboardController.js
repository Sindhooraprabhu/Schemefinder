

// // backend/controllers/dashboardController.js
// const FarmerData = require('../models/FarmerData');
// const EntrepreneurData = require('../models/EntrepreneurData');
// const User = require('../models/User');
// const Scheme = require('../models/Scheme');

// // GET Dashboard Data (specific to user role)
// exports.getDashboardData = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const userRole = req.user.role;

//     let userSpecificData;
//     let eligibleSchemes;

//     if (userRole === 'farmer') {
//       userSpecificData = await FarmerData.findOne({ userId });
//       eligibleSchemes = await Scheme.find({ target_audience: 'farmers' }).limit(5);
//     } else if (userRole === 'entrepreneur') {
//       userSpecificData = await EntrepreneurData.findOne({ userId });
//       eligibleSchemes = await Scheme.find({ target_audience: 'entrepreneurs' }).limit(5);
//     }

//     if (!userSpecificData) {
//       return res.status(404).json({ message: 'Dashboard data not found for this user.' });
//     }

//     res.json({
//       userSpecificData,
//       eligibleSchemes,
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: 'Server Error', error: err.message });
// }

// };

// // CREATE/UPDATE Dashboard Data (with corrected file handling)
// exports.upsertDashboardData = async (req, res) => {
//   const userId = req.user.id;
//   const userRole = req.user.role;
//   const files = req.files;

//   try {
//     let dashboardModel;
//     let dataToSave = { ...req.body, userId };

//    if (userRole === 'farmer') {
//   dashboardModel = FarmerData;
//   if (files) {
//     if (files.landImage && files.landImage.length > 0)
//       dataToSave.landImage = files.landImage[0].path; // single string
//     if (files.idDocuments) dataToSave.idDocuments = files.idDocuments.map(f => f.path);
//     if (files.homePhotos) dataToSave.homePhotos = files.homePhotos.map(f => f.path);
//   }
// }


//      else if (userRole === 'entrepreneur') {
//       dashboardModel = EntrepreneurData;
//       if (files) {
//         if (files.businessDocuments) dataToSave.businessDocuments = files.businessDocuments.map(f => f.path);
//         if (files.businessPhotos) dataToSave.businessPhotos = files.businessPhotos.map(f => f.path);
//       }
//     } else {
//       return res.status(403).json({ message: 'Unauthorized role.' });
//     }

//     let dashboardData = await dashboardModel.findOneAndUpdate(
//       { userId },
//       { $set: dataToSave },
//       { new: true, upsert: true, setDefaultsOnInsert: true }
//     );

//     await User.findByIdAndUpdate(userId, { dashboardData: dashboardData._id });

//     res.json({ message: 'Dashboard data saved successfully', data: dashboardData });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: 'Server Error', error: err.message });
// }

// };

// // DELETE Dashboard Data
// exports.deleteDashboardData = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const userRole = req.user.role;
//     let dashboardModel;
//     if (userRole === 'farmer') {
//       dashboardModel = FarmerData;
//     } else if (userRole === 'entrepreneur') {
//       dashboardModel = EntrepreneurData;
//     } else {
//       return res.status(403).json({ message: 'Unauthorized role.' });
//     }
//     await User.findByIdAndUpdate(userId, { $unset: { dashboardData: "" } });
//     await dashboardModel.findOneAndDelete({ userId });
//     res.json({ message: 'Dashboard data deleted successfully.' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: 'Server Error', error: err.message });
// }

// };
















const FarmerData = require('../models/FarmerData');
const EntrepreneurData = require('../models/EntrepreneurData');
const User = require('../models/User');
const Scheme = require('../models/Scheme');

// GET Dashboard Data
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    let userSpecificData = {};
    let eligibleSchemes = [];

    if (userRole === 'farmer') {
      userSpecificData = await FarmerData.findOne({ userId }) || {};
      eligibleSchemes = await Scheme.find({ target_audience: 'farmers' }).limit(5);
    } else if (userRole === 'entrepreneur') {
      userSpecificData = await EntrepreneurData.findOne({ userId }) || {};
      eligibleSchemes = await Scheme.find({ target_audience: 'entrepreneurs' }).limit(5);
    }

    res.json({
      userSpecificData,
      eligibleSchemes
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// CREATE/UPDATE Dashboard Data
exports.upsertDashboardData = async (req, res) => {
  const userId = req.user.id;
  const userRole = req.user.role;
  const files = req.files;

  try {
    let dashboardModel;
    let dataToSave = { ...req.body, userId };

    if (userRole === 'farmer') {
      dashboardModel = FarmerData;
      if (files) {
        if (files.landImage && files.landImage.length > 0)
          dataToSave.landImage = files.landImage[0].path;
        if (files.idDocuments) dataToSave.idDocuments = files.idDocuments.map(f => f.path);
        if (files.homePhotos) dataToSave.homePhotos = files.homePhotos.map(f => f.path);
      }
    } else if (userRole === 'entrepreneur') {
      dashboardModel = EntrepreneurData;
      if (files) {
        if (files.businessDocuments) dataToSave.businessDocuments = files.businessDocuments.map(f => f.path);
        if (files.businessPhotos) dataToSave.businessPhotos = files.businessPhotos.map(f => f.path);
      }
    } else {
      return res.status(403).json({ message: 'Unauthorized role.' });
    }

    let dashboardData = await dashboardModel.findOneAndUpdate(
      { userId },
      { $set: dataToSave },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // Optional: store dashboard reference in User model
    await User.findByIdAndUpdate(userId, { dashboardData: dashboardData._id });

    res.json({ message: 'Dashboard data saved successfully', data: dashboardData });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// DELETE Dashboard Data
exports.deleteDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    let dashboardModel;
    if (userRole === 'farmer') dashboardModel = FarmerData;
    else if (userRole === 'entrepreneur') dashboardModel = EntrepreneurData;
    else return res.status(403).json({ message: 'Unauthorized role.' });

    await dashboardModel.findOneAndDelete({ userId });
    await User.findByIdAndUpdate(userId, { $unset: { dashboardData: "" } });

    res.json({ message: 'Dashboard data deleted successfully.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
