import React, { useState, useEffect } from 'react';
//import Navbar from '../components/Navbar';
import { Container, Form, Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSchemes, setFilteredSchemes] = useState([]);

  const fetchAllSchemes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/schemes/all');
      const data = await response.json();
      setSchemes(data);
      setFilteredSchemes(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch schemes:', error);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const newFilteredSchemes = schemes.filter(scheme =>
      (scheme.name_en && scheme.name_en.toLowerCase().includes(query)) ||
      (scheme.name_kn && scheme.name_kn.toLowerCase().includes(query)) ||
      (scheme.description_en && scheme.description_en.toLowerCase().includes(query))
    );
    setFilteredSchemes(newFilteredSchemes);
  };

  useEffect(() => {
    fetchAllSchemes();
  }, []);

  const SchemeCard = ({ scheme }) => (
    <Card className="shadow-sm p-4 m-3" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className="text-info">{scheme.name_en}</Card.Title>
        <Card.Text className="text-secondary">
          {scheme.description_en.substring(0, 100)}...
        </Card.Text>
        <Link to={`/schemes/${scheme._id}`} className="btn btn-outline-info mt-2">
          Learn More
        </Link>
      </Card.Body>
    </Card>
  );

  return (
    <div className="bg-light min-vh-100">
   
      <header className="bg-info text-white py-5 px-3 text-center">
        <h1 className="display-4 fw-bold">Welcome to Gov Scheme Finder</h1>
        <p className="lead mt-3 mx-auto" style={{ maxWidth: '48rem' }}>
          Your one-stop platform to easily discover and understand government schemes,
          subsidies, and welfare programs relevant to you.
        </p>
      </header>
      <section className="py-4 px-3 text-center mt-n4 position-relative z-index-10">
        <div className="input-group mx-auto" style={{ maxWidth: '48rem' }}>
          <Form.Control
            type="text"
            placeholder="Search for schemes..."
            className="form-control-lg shadow-lg"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </section>
      <section className="py-5 px-3">
        {loading ? (
          <div className="text-center text-secondary fs-5">Loading schemes...</div>
        ) : (
          <Container>
            <h2 className="text-center fw-bold text-dark mb-4">All Government Schemes</h2>
            <div className="d-flex flex-wrap justify-content-center">
              {filteredSchemes.length > 0 ? (
                filteredSchemes.map(scheme => (
                  <SchemeCard key={scheme._id} scheme={scheme} />
                ))
              ) : (
                <div className="text-center text-secondary fs-5">No schemes found.</div>
              )}
            </div>
          </Container>
        )}
      </section>
    </div>
  );
};

export default Home;