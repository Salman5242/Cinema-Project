import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import data from '../../../public/data.json';

export default function DirectorDetails({ movie, director, directedMovies }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!director) {
    return (
      <Layout>
        <div className="error-page">
          <h1>Director not found</h1>
          <button className="button" onClick={() => router.push('/movies')}>
            Back to Movies
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="movie-details">
        <button
          className="button"
          onClick={() => router.push(`/movies/${movie.id}`)}
          style={{ marginBottom: '2rem' }}
        >
          Back to Movie
        </button>

        <h1>{director.name}</h1>
        <p style={{ margin: '1.5rem 0' }}>{director.biography}</p>

        <h2>Movies Directed</h2>
        <div className="movie-grid">
          {directedMovies.map((movie) => {
            const genre = data.genres.find(g => g.id === movie.genreId);
            
            return (
              <div
                key={movie.id}
                className="movie-card"
                onClick={() => router.push(`/movies/${movie.id}`)}
              >
                <div className="movie-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  <div className="movie-meta">
                    <p>Genre: {genre?.name}</p>
                    <p>Rating: {movie.rating}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: data.movies.map((movie) => ({
      params: { id: movie.id }
    })),
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  const movie = data.movies.find(m => m.id === params.id);
  
  if (!movie) {
    return {
      notFound: true
    };
  }

  const director = data.directors.find(d => d.id === movie.directorId);
  const directedMovies = data.movies.filter(m => m.directorId === director?.id);

  return {
    props: {
      movie,
      director,
      directedMovies
    },
    revalidate: 60
  };
} 