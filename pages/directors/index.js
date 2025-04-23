import useSWR from 'swr';
import Layout from '../../components/Layout';
import data from '../../public/data.json';

// Simulating an API fetch since we're using local data
const fetcher = () => Promise.resolve(data);

export default function Directors() {
  const { data: movieData, error } = useSWR('/api/data', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!movieData) return <div>Loading...</div>;

  return (
    <Layout>
      <h1 style={{ margin: '2rem 0' }}>Directors</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {movieData.directors.map((director) => {
          const directedMovies = movieData.movies.filter(
            m => m.directorId === director.id
          );

          return (
            <div key={director.id} className="director-card">
              <h2 className="director-name">{director.name}</h2>
              <p className="director-bio">{director.biography}</p>
              
              <h3 style={{ margin: '1rem 0' }}>Movies Directed:</h3>
              <div className="movie-grid">
                {directedMovies.map((movie) => {
                  const genre = movieData.genres.find(g => g.id === movie.genreId);
                  
                  return (
                    <div key={movie.id} className="movie-card">
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
          );
        })}
      </div>
    </Layout>
  );
} 