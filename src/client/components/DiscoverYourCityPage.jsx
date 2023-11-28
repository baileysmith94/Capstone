import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const DiscoverYourCityPage = () => {
  const citiesData = [
    { name: 'Los Angeles, CA', description: 'Explore the charm of LA with its vibrant culture and diverse culinary scene.', image: 'images/LA.png' },
    { name: 'Nashville, TN', description: 'Immerse yourself in the rich history and modern attractions of Nashville.', image: 'images/nash.png' },
    { name: 'Seattle, WA', description: 'Discover the hidden gems and local favorites in the heart of Seattle.', image: 'images/seattle.jpeg' },
  ];

  return (
    <Container style={{ marginTop: "8rem" }}>
      <h1 className="text-center mb-4">Discover Your City</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {citiesData.map((city, index) => (
          <Col key={index}>
            <Card>
              <img src={city.image} alt={`City ${index + 1}`} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {city.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {city.description}
                </Typography>
                <Link to="/restaurants" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="primary" fullWidth style={{backgroundColor:'#b50000'}} className='mt-3'>
                    Click Me
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DiscoverYourCityPage;
