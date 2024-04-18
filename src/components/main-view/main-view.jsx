import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Col, Row } from "react-bootstrap/";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://justinsmoviedb-6d40ef42c02f.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((movies) => {
                // const moviesFromApi = data.map((movie) => {
                //     return {
                //         title: movie.title,
                //         image: movie.imageUrl,
                //         director: movie.director.name,
                //         description: movie.description,
                //         genre: movie.genre.name
                //     };
                // });

                setMovies(movies);
            });
    }, [token]);

    return (
        <Row className="justify-content-md-center" style={{border: "solid 5px blue"}}>  
          {!user ? (
            <Col md={5} style={{border: "solid 5px black"}}>
                <LoginView onLoggedIn={(user) => setUser(user)} />
              or
              <SignupView />
            </Col>
          ) : selectedMovie ? (
            <Col md={8} style={{border: "solid 5px green"}}>
              <MovieView 
              movie={selectedMovie} 
              onBackClick={() => setSelectedMovie(null)} 
                />
            </Col>
          ) : movies.length === 0 ? (
            <div>The list is empty!</div>
          ) : (
            <>
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              ))}
            </>
          )}
        </Row>
    );
  };
  