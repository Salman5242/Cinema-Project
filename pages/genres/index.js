import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import data from '../../public/data.json';

export default function Genres() {
  const router = useRouter();

  return (
    <Layout>
      <h1 style={{ margin: '2rem 0' }}>Movie Genres</h1>
      <div className="genre-list" style={{ flexDirection: 'column', gap: '1.5rem' }}>
        {data.genres.map((genre) => {
          const moviesInGenre = data.movies.filter(m => m.genreId === genre.id);
          
          return (
            <div
              key={genre.id}
              className="genre-item"
              style={{
                padding: '1.5rem',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onClick={() => router.push(`/genres/${genre.id}`)}
            >
              <div>
                <h2 style={{ marginBottom: '0.5rem' }}>{genre.name}</h2>
                <p>{moviesInGenre.length} movies</p>
              </div>
              <button className="button">View Movies</button>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  return {
    props: {}
  };
} 