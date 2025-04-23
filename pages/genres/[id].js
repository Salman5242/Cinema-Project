import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import data from '../../public/data.json';

export default function GenreMovies({ genre, movies }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!genre) {
    return (
      <Layout>
        <div className="error-page">
          <h1>Genre not found</h1>
          <button className="button" onClick={() => router.push('/genres')}>
            Back to Genres
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ margin: '2rem 0' }}>
        <button
          className="button"
          onClick={() => router.push('/genres')}
          style={{ marginBottom: '1rem' }}
        >
          Back to Genres
        </button>
        <h1>{genre.name} Movies</h1>
      </div>

      <div className="movie-grid">
        {movies.map((movie) => {
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

export async function getServerSideProps({ params }) {
  const genre = data.genres.find(g => g.id === params.id);
  
  if (!genre) {
    return {
      notFound: true
    };
  }

  const movies = data.movies.filter(m => m.genreId === genre.id);

  return {
    props: {
      genre,
      movies
    }
  };
} 