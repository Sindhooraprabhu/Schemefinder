import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const EntrepreneurDashboard = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();

    const [formData, setFormData] = useState({
        businessName_en: '',
        businessName_kn: '',
        businessType_en: '',
        businessType_kn: '',
        registrationId: '',
        businessAddress_en: '',
        businessAddress_kn: '',
        investmentAmount: '',
        investmentCurrency: 'INR',
        requiredLicenses_en: '',
        requiredLicenses_kn: '',
        businessPlan_en: '',
        businessPlan_kn: '',
        businessDocuments: null,
        businessPhotos: null
    });

    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('info');
    const [loading, setLoading] = useState(true);
    const [eligibleSchemes, setEligibleSchemes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!auth || !auth.token) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/dashboard', {
                    headers: { 'x-auth-token': auth.token },
                });

                if (response.ok) {
                    const { userSpecificData, eligibleSchemes } = await response.json();
                    setFormData(prev => ({ ...prev, ...userSpecificData }));
                    setEligibleSchemes(eligibleSchemes);
                    setMessage('Existing data loaded.');
                    setVariant('success');
                } else if (response.status === 404) {
                    setMessage('No existing data found. Please fill out the form.');
                    setVariant('info');
                } else if (response.status === 401) {
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

        if (auth) fetchData();
    }, [auth, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData(prev => ({ ...prev, [name]: files }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const token = auth.token;
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
                if (key === 'businessDocuments' || key === 'businessPhotos') {
                    for (let i = 0; i < formData[key].length; i++) {
                        data.append(key, formData[key][i]);
                    }
                } else {
                    data.append(key, formData[key]);
                }
            }
        });

        try {
            const response = await fetch('http://localhost:5000/api/dashboard', {
                method: 'POST',
                headers: { 'x-auth-token': token },
                body: data
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
                    <h1 className="text-center mb-4">Entrepreneur Dashboard / ಉದ್ಯಮಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್</h1>
                    {message && <Alert variant={variant}>{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <h3 className="mb-3">Business Details / ವ್ಯವಹಾರದ ವಿವರಗಳು</h3>
                        <Form.Group className="mb-3">
                            <Form.Label>Business Name (EN)</Form.Label>
                            <Form.Control type="text" name="businessName_en" value={formData.businessName_en} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Business Name (KN)</Form.Label>
                            <Form.Control type="text" name="businessName_kn" value={formData.businessName_kn} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Business Type (EN)</Form.Label>
                            <Form.Control type="text" name="businessType_en" value={formData.businessType_en} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Business Type (KN)</Form.Label>
                            <Form.Control type="text" name="businessType_kn" value={formData.businessType_kn} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Registration ID</Form.Label>
                            <Form.Control type="text" name="registrationId" value={formData.registrationId} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Business Address (EN)</Form.Label>
                            <Form.Control type="text" name="businessAddress_en" value={formData.businessAddress_en} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Business Address (KN)</Form.Label>
                            <Form.Control type="text" name="businessAddress_kn" value={formData.businessAddress_kn} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Investment Amount</Form.Label>
                            <Form.Control type="number" name="investmentAmount" value={formData.investmentAmount} onChange={handleChange} min="0" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Required Licenses (EN)</Form.Label>
                            <Form.Control type="text" name="requiredLicenses_en" value={formData.requiredLicenses_en} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Business Plan (EN)</Form.Label>
                            <Form.Control as="textarea" name="businessPlan_en" value={formData.businessPlan_en} onChange={handleChange} rows={4} />
                        </Form.Group>

                        <hr className="my-4" />
                        <h3 className="mb-3">Documents / ದಾಖಲೆಗಳು</h3>
                        <Form.Group className="mb-3">
                            <Form.Label>Upload Business Documents</Form.Label>
                            <Form.Control type="file" name="businessDocuments" onChange={handleFileChange} multiple />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Upload Business Photos</Form.Label>
                            <Form.Control type="file" name="businessPhotos" onChange={handleFileChange} multiple />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mt-4" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Details / ವಿವರಗಳನ್ನು ಉಳಿಸಿ'}
                        </Button>
                    </Form>
                </Card>

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

export default EntrepreneurDashboard;
