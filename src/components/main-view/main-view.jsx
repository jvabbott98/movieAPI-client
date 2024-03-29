import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Inception",
            image: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
            director: "Christopher Nolan"
        },
        {
            id: 2,
            title: "Jaws",
            image: "https://upload.wikimedia.org/wikipedia/commons/9/93/Jaws_movie_poster.png",
            director: "Steven Spielberg"
        },
        {
            id: 3,
            title: "Zoolander",
            image: "https://upload.wikimedia.org/wikipedia/en/7/7c/Movie_poster_zoolander.jpg",
            director: "Ben Stiller"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);
    
    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        )
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};