import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Custom404() {
  const router = useRouter();

  return (
    <Layout>
      <div className="error-page">
        <h1>404 - Page Not Found</h1>
        <p style={{ margin: '1rem 0', color: 'var(--text-secondary)' }}>
          Oops! The page you're looking for doesn't exist.
        </p>
        <button className="button" onClick={() => router.push('/')}>
          Go Home
        </button>
      </div>
    </Layout>
  );
} 