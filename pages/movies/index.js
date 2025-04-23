import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import data from '../../public/data.json';

export default function Movies() {
  const router = useRouter();
  const [selectedGenre, setSelectedGenre] = useState('all');
  
  const filteredMovies = selectedGenre === 'all'
    ? data.movies
    : data.movies.filter(movie => movie.genreId === selectedGenre);

  return (
    <Layout>
      <h1 style={{ margin: '2rem 0' }}>Movies</h1>
      
      <div className="genre-list">
        <button
          className={`genre-item ${selectedGenre === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedGenre('all')}
        >
          All
        </button>
        {data.genres.map((genre) => (
          <button
            key={genre.id}
            className={`genre-item ${selectedGenre === genre.id ? 'active' : ''}`}
            onClick={() => setSelectedGenre(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      <div className="movie-grid">
        {filteredMovies.map((movie) => {
          const genre = data.genres.find(g => g.id === movie.genreId);
          const director = data.directors.find(d => d.id === movie.directorId);
          
          return (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => router.push(`/movies/${movie.id}`)}
            >
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <div className="movie-meta">
                  <p>Director: {director?.name}</p>
                  <p>Genre: {genre?.name}</p>
                  <p>Rating: {movie.rating}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 60
  };
} 