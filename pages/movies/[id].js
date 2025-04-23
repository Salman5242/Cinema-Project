import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import data from '../../public/data.json';

export default function MovieDetails({ movie, genre, director }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return (
      <Layout>
        <div className="error-page">
          <h1>Movie not found</h1>
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
        <h1>{movie.title}</h1>
        <div className="movie-meta" style={{ margin: '1rem 0' }}>
          <p>Release Year: {movie.releaseYear}</p>
          <p>Genre: {genre?.name}</p>
          <p>Rating: {movie.rating}</p>
        </div>
        <p style={{ margin: '1rem 0' }}>{movie.description}</p>
        
        <div style={{ marginTop: '2rem' }}>
          <h2>Director</h2>
          <div className="director-card">
            <h3 className="director-name">{director?.name}</h3>
            <p className="director-bio">{director?.biography}</p>
            <button
              className="button"
              onClick={() => router.push(`/movies/${movie.id}/director`)}
            >
              View Director Details
            </button>
          </div>
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

  const genre = data.genres.find(g => g.id === movie.genreId);
  const director = data.directors.find(d => d.id === movie.directorId);

  return {
    props: {
      movie,
      genre,
      director
    },
    revalidate: 60
  };
} 