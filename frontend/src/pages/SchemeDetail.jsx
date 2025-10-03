import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SchemeDetail.css';

const API_URL = 'http://localhost:5000/api/dashboard';
const SUBMIT_URL = 'http://localhost:5000/api/application/submit';

const SchemeDetail = () => {
  const { id: schemeId } = useParams(); // match the route /schemes/:id
  const [dashboardData, setDashboardData] = useState(null);
  const [scheme, setScheme] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({}); // For additional application data

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const roleFromStorage = localStorage.getItem('role'); 
        setRole(roleFromStorage);

        const res = await axios.get(API_URL, {
          headers: { 'x-auth-token': token }
        });

        const userData = res.data?.userSpecificData || null;
        const schemes = res.data?.eligibleSchemes || [];

        setDashboardData(userData);

        const selectedScheme = schemes.find(s => s._id === schemeId) || null;
        setScheme(selectedScheme);

        console.log("Dashboard Data:", userData);
        console.log("Eligible Schemes:", schemes);
        console.log("Selected Scheme:", selectedScheme);

      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [schemeId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(SUBMIT_URL, { schemeId, formData }, {
        headers: { 'x-auth-token': token }
      });
      console.log("Application Response:", res.data);
      alert("Application submitted successfully!");
    } catch (err) {
      console.error("Error submitting application:", err.response?.data || err.message);
      alert("Failed to submit application.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!dashboardData) return <div>No dashboard data available</div>;
  if (!scheme) return <div>Scheme not found</div>;

  return (
    <div className="scheme-detail-container">
      <h1>{scheme.name_en}</h1>
      <p>{scheme.description_en}</p>
      <p><strong>Target Audience:</strong> {scheme.target_audience.join(', ')}</p>

      <h2>Your Profile Snapshot</h2>
      {role === 'farmer' && dashboardData && (
        <table>
          <tbody>
            <tr><td>Aadhaar</td><td>{dashboardData.aadhaarNumber}</td></tr>
            <tr><td>PAN</td><td>{dashboardData.panNumber}</td></tr>
            <tr><td>Ration Card</td><td>{dashboardData.rationCardNumber}</td></tr>
            <tr><td>Land Area</td><td>{dashboardData.landArea}</td></tr>
            <tr><td>Crop Info</td><td>{dashboardData.cropInfo}</td></tr>
            <tr><td>Cultivation Method</td><td>{dashboardData.cultivationMethod}</td></tr>
            <tr><td>Irrigation Type</td><td>{dashboardData.irrigationType}</td></tr>
            {dashboardData.landImage && (
              <tr>
                <td>Land Image</td>
                <td><img src={`http://localhost:5000/${dashboardData.landImage}`} alt="Land" width="150"/></td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {role === 'entrepreneur' && dashboardData && (
        <table>
          <tbody>
            <tr><td>Business Name</td><td>{dashboardData.businessName_en}</td></tr>
            <tr><td>Business Type</td><td>{dashboardData.businessType_en}</td></tr>
            <tr><td>Registration ID</td><td>{dashboardData.registrationId}</td></tr>
            <tr><td>Investment Amount</td><td>{dashboardData.investmentAmount} {dashboardData.investmentCurrency}</td></tr>
            <tr><td>Business Address</td><td>{dashboardData.businessAddress_en}</td></tr>
            <tr><td>Required Licenses</td><td>{dashboardData.requiredLicenses_en}</td></tr>
            <tr><td>Business Plan</td><td>{dashboardData.businessPlan_en}</td></tr>
          </tbody>
        </table>
      )}

      <h2>Apply for this Scheme</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Additional Info:
          <input
            type="text"
            name="additionalInfo"
            value={formData.additionalInfo || ''}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default SchemeDetail;
