// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import SchemeDetail from './pages/SchemeDetail';
// import DashboardWrapper from './pages/DashboardWrapper';
// import Navbar from './components/Navbar'; // Assuming your Navbar component is exported as 'Navbar'
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { AuthProvider } from './context/AuthContext.jsx';


// function App() {
//   return (
//     <AuthProvider>
//     <Router>
//       <div className="App">
//         {/* The Navbar should be outside the Routes to appear on all pages */}
//         <Navbar /> 
        
//         <main>
//           {/* This div is where the Google Translate widget will be inserted */}
//           <div id="google_translate_element"></div>
      
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/schemes/:id" element={<SchemeDetail />} />
//             <Route path="/signup" element={<Signup />} /> 
//             <Route path="/login" element={<Login />} />
//             <Route path="/dashboard" element={<DashboardWrapper />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//     </AuthProvider>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Outlet
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SchemeDetail from './pages/SchemeDetail';
import DashboardWrapper from './pages/DashboardWrapper';
import Navbar from './components/Navbar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext.jsx';
import PrivateRoute from './components/PrivateRoute.jsx'; // Import the new PrivateRoute component

function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        {/* The Navbar should be outside the Routes to appear on all pages */}
        <Navbar /> 
        
        <main>
          {/* This div is where the Google Translate widget will be inserted */}
          <div id="google_translate_element"></div>
        
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/schemes/:id" element={<SchemeDetail />} />
            
            <Route path="/signup" element={<Signup />} /> 
            <Route path="/login" element={<Login />} />
            
            {/* 🔒 Protected Routes using the PrivateRoute component */}
            <Route element={<PrivateRoute />}>
                {/* The Dashboard is now protected. Users must be authenticated to reach this route. */}
                <Route path="/dashboard" element={<DashboardWrapper />} />
            </Route>
            
            {/* If you have an unhandled route, consider adding a catch-all route here */}
          </Routes>
        </main>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;