import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; // Corrected import path

const FarmerDashboard = () => {
    const navigate = useNavigate();
    const { auth } = useAuth(); // Get the auth state from context

    const [formData, setFormData] = useState({
        landRecords: '',
        landArea: '',
        rtcDetails: '',
        cropInfo: '',
        cultivationMethod: '',
        irrigationType: 'Rainfed',
        aadhaarNumber: '',
        panNumber: '',
        rationCardNumber: '',
        landImage: null,
        idDocuments: null,
        homePhotos: null,
    });

    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('info');
    const [loading, setLoading] = useState(true);
    const [eligibleSchemes, setEligibleSchemes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Check auth state from context first
            if (!auth || !auth.token) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/dashboard', {
                    headers: {
                        'x-auth-token': auth.token, // Use token from context
                    },
                });

                if (response.ok) {
                    const { userSpecificData, eligibleSchemes } = await response.json();
                    console.log(eligibleSchemes)
                    setFormData(prev => ({
                        ...prev,
                        ...userSpecificData,
                    }));
                    setEligibleSchemes(eligibleSchemes);
                    setMessage('Existing data loaded.');
                    setVariant('success');
                } else if (response.status === 404) {
                    setMessage('No existing data found. Please fill out the form.');
                    setVariant('info');
                } else if (response.status === 401) {
                    // Redirect to login on unauthorized access
                    navigate("/login");
                } else {
                    setMessage('Failed to load existing data.');
                    setVariant('danger');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setMessage('Server error. Failed to load data.');
                setVariant('danger');
            } finally {
                setLoading(false);
            }
        };

        // Only fetch data if the user is authenticated (auth object exists)
        if (auth) {
            fetchData();
        }
    }, [auth, navigate]); // Depend on auth and navigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData(prev => ({ ...prev, [name]: files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const token = auth.token; // Get token from context

        if (!token) {
             setMessage('Session expired. Please log in again.');
             setVariant('danger');
             setLoading(false);
             navigate('/login');
             return;
        }
        
        const data = new FormData();

        Object.keys(formData).forEach(key => {
            if (formData[key]) {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await fetch('http://localhost:5000/api/dashboard', {
                method: 'POST',
                headers: {
                    // NOTE: Do NOT include 'Content-Type' when sending FormData
                    'x-auth-token': token,
                },
                body: data,
            });

            const resData = await response.json();
            if (response.ok) {
                setMessage(resData.message || 'Dashboard data saved successfully!');
                setVariant('success');
            } else {
                setMessage(resData.message || 'Failed to save dashboard data.');
                setVariant('danger');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            setMessage('Server error. Failed to save data.');
            setVariant('danger');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <Container className="my-5 text-center">Loading your dashboard data...</Container>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <Container className="my-5">
                <Card className="p-4 shadow">
                    <h1 className="text-center mb-4">Farmer Dashboard / ರೈತರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್</h1>
                    {message && <Alert variant={variant}>{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        {/* Land Details */}
                        <h3 className="mb-3">Land Details / ಭೂಮಿ ವಿವರಗಳು</h3>
                        <Form.Group className="mb-3">
                            <Form.Label>Land Records / ಭೂಮಿ ದಾಖಲೆಗಳು</Form.Label>
                            <Form.Control
                                type="text"
                                name="landRecords"
                                placeholder="e.g., Survey No. 123, Village: Examplepur / ಉದಾ: ಸರ್ವೆ ನಂ. 123, ಗ್ರಾಮ: ಉದಾಹರಣೆಪುರ"
                                value={formData.landRecords}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Land Area (in Acres) / ಭೂಮಿ ವಿಸ್ತೀರ್ಣ (ಎಕರೆಯಲ್ಲಿ)</Form.Label>
                            <Form.Control
                                type="number"
                                name="landArea"
                                placeholder="e.g., 5.5"
                                value={formData.landArea}
                                onChange={handleChange}
                                min="0"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>RTC Details / ಆರ್‌ಟಿಸಿ ವಿವರಗಳು</Form.Label>
                            <Form.Control
                                type="text"
                                name="rtcDetails"
                                placeholder="e.g., RTC No. ABC123, Year: 2023-24 / ಉದಾ: ಆರ್‌ಟಿಸಿ ಸಂಖ್ಯೆ ಎಬಿಸಿ123, ವರ್ಷ: 2023-24"
                                value={formData.rtcDetails}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Land Photos / ಭೂಮಿ ಚಿತ್ರಗಳು</Form.Label>
                            <Form.Control
                                type="file"
                                name="landImage"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                            <Form.Text className="text-muted">
                                Upload images of your land (PDF/Image).
                            </Form.Text>
                        </Form.Group>

                        <hr className="my-4" />

                        {/* Crop Information */}
                        <h3 className="mb-3">Crop Information / ಬೆಳೆ ಮಾಹಿತಿ</h3>
                        <Form.Group className="mb-3">
                            <Form.Label>Crop Type / ಬೆಳೆ ಪ್ರಕಾರ</Form.Label>
                            <Form.Control
                                type="text"
                                name="cropInfo"
                                placeholder="e.g., Paddy, Maize / ಉದಾ: ಭತ್ತ, ಮೆಕ್ಕೆಜೋಳ"
                                value={formData.cropInfo}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Cultivation Method / ಸಾಗುವಳಿ ವಿಧಾನ</Form.Label>
                            <Form.Control
                                type="text"
                                name="cultivationMethod"
                                placeholder="e.g., Organic, Conventional / ಉದಾ: ಸಾವಯವ, ಸಾಂಪ್ರದಾಯಿಕ"
                                value={formData.cultivationMethod}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Irrigation Type / ನೀರಾವರಿ ಪ್ರಕಾರ</Form.Label>
                            <Form.Select
                                name="irrigationType"
                                value={formData.irrigationType}
                                onChange={handleChange}
                                required
                            >
                                <option value="Rainfed">Rainfed / ಮಳೆ ಆಧಾರಿತ</option>
                                <option value="Borewell">Borewell / ಬೋರ್‌ವೆಲ್</option>
                                <option value="Canal">Canal / ಕಾಲುವೆ</option>
                                <option value="Tank">Tank / ಕೆರೆ</option>
                                <option value="Well">Well / ಬಾವಿ</option>
                                <option value="others">Others / ಇತರೆ</option>
                            </Form.Select>
                        </Form.Group>

                        <hr className="my-4" />

                        {/* Personal & Identity Documents */}
                        <h3 className="mb-3">Personal & Identity Documents / ವೈಯಕ್ತಿಕ ಮತ್ತು ಗುರುತಿನ ದಾಖಲೆಗಳು</h3>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Aadhaar Number / ಆಧಾರ್ ಸಂಖ್ಯೆ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="aadhaarNumber"
                                        placeholder="Enter 12-digit Aadhaar"
                                        value={formData.aadhaarNumber}
                                        onChange={handleChange}
                                        maxLength="12"
                                        pattern="\d{12}"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>PAN Number / ಪ್ಯಾನ್ ಸಂಖ್ಯೆ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="panNumber"
                                        placeholder="Enter PAN"
                                        value={formData.panNumber}
                                        onChange={handleChange}
                                        maxLength="10"
                                        pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Ration Card Number / ರೇಷನ್ ಕಾರ್ಡ್ ಸಂಖ್ಯೆ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="rationCardNumber"
                                        placeholder="Enter Ration Card No."
                                        value={formData.rationCardNumber}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Upload ID Documents (Aadhaar, PAN, Ration) / ಗುರುತಿನ ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ</Form.Label>
                            <Form.Control
                                type="file"
                                name="idDocuments"
                                onChange={handleFileChange}
                                accept="image/*,application/pdf"
                            />
                            <Form.Text className="text-muted">
                                Upload Aadhaar, PAN, Ration Card (PDF or Image).
                            </Form.Text>
                        </Form.Group>

                        <hr className="my-4" />

                        {/* Home Picture */}
                        <h3 className="mb-3">Home Picture / ಮನೆ ಚಿತ್ರ</h3>
                        <Form.Group className="mb-3">
                            <Form.Label>Upload Home Photos / ಮನೆ ಚಿತ್ರಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ</Form.Label>
                            <Form.Control
                                type="file"
                                name="homePhotos"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                            <Form.Text className="text-muted">
                                Upload images of your home.
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mt-4" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Details / ವಿವರಗಳನ್ನು ಉಳಿಸಿ'}
                        </Button>
                    </Form>
                </Card>

                {/* New section for eligible schemes */}
                <Card className="p-4 shadow mt-5">
                    <h3 className="mb-4">Eligible Schemes / ಅರ್ಹ ಯೋಜನೆಗಳು</h3>
                    <Row xs={1} md={2} className="g-4">
                        {eligibleSchemes.length > 0 ? (
                            eligibleSchemes.map(scheme => (
                                <Col key={scheme._id}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title className="d-flex justify-content-between align-items-center">
                                                {scheme.name_en}
                                                <span className="text-success" style={{ fontSize: '1.5rem' }}>✓</span>
                                            </Card.Title>
                                            <Card.Text>
                                                {scheme.description_en.length > 100
                                                    ? `${scheme.description_en.substring(0, 100)}...`
                                                    : scheme.description_en}
                                            </Card.Text>
                                            <Link to={`/schemes/${scheme._id}`} className="btn btn-outline-info">
                                                Apply Now
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <p className="text-muted">No eligible schemes found at this time.</p>
                        )}
                    </Row>
                </Card>
            </Container>
        </>
    );
};

export default FarmerDashboard;