import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import data from '../public/data.json';

export default function Home() {
  const router = useRouter();
  const trendingMovies = data.movies
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <Layout>
      <h1 style={{ margin: '2rem 0' }}>Welcome to Movie House</h1>
      <button
        className="button"
        onClick={() => router.push('/genres')}
        style={{ marginBottom: '2rem' }}
      >
        Browse Genres
      </button>
      
      <h2>Trending Movies</h2>
      <div className="movie-grid">
        {trendingMovies.map((movie) => {
          const genre = data.genres.find(g => g.id === movie.genreId);
          const director = data.directors.find(d => d.id === movie.directorId);
          
          return (
            <div key={movie.id} className="movie-card" onClick={() => router.push(`/movies/${movie.id}`)}>
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
    revalidate: 60 // Revalidate every minute
  };
}
