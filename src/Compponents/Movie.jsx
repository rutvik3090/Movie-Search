import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const API_KEY = '260c9b7e'; // Replace with your valid API key

const Movie = () => {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const fetchMovies = async (term) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${term}&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
        setError('');
      } else {
        setMovies([]);
        setError('No movies found');
      }
    } catch (error) {
      setMovies([]);
      setError('Error fetching movies');
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearch(term);

    if (term !== '') {
      fetchMovies(term);
    } else {
      setMovies([]);
      setError('');
    }
  };

  return (
    <div className="container">
      <Row>
        <h1>Movie Search</h1>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={search}
          onChange={handleSearch}
        />
        {error && <p className="error">{error}</p>}
        <Container className='mt-2 '>
          <Row className="movie-list">
            {movies.length > 0 ? (
              movies.map((movie, index) => (
                <Col key={index} md={6} lg={4} className="mb-4"> {/* Use Col with margin-bottom for spacing */}
                  <Card style={{ width: "18rem" }} className='h-100' >
                    <Card.Img variant="top" className='img-fluid w-100' src={movie.Poster} alt={movie.Title} />
                    <Card.Body>
                      <Card.Title>{movie.Title}</Card.Title>
                      <Card.Text>
                        <span>Year</span>: {movie.Year}
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <p>No movies found</p>
              </Col>
            )}
          </Row>
        </Container>
      </Row>
    </div>
  );
};

export default Movie;
