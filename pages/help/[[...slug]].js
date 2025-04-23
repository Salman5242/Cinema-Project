import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

const helpContent = {
  index: {
    title: 'Help Center',
    content: `
      Welcome to the Movie House help center. Choose a topic below:
      
      • FAQs - Frequently asked questions
      • Contact - Get in touch with us
      • Privacy - Our privacy policy
    `
  },
  faqs: {
    title: 'Frequently Asked Questions',
    content: `
      1. How do I find a movie?
         You can browse all movies or filter by genre.
      
      2. How are movies rated?
         Movies are rated on a scale of 1-10 based on user ratings.
      
      3. Can I see all movies by a director?
         Yes, click on any director's name to see their complete filmography.
    `
  },
  contact: {
    title: 'Contact Us',
    content: `
      Have questions or feedback? We'd love to hear from you!
      
      Email: support@moviehouse.com
      Phone: 1-800-MOVIES
      
      Business Hours:
      Monday-Friday: 9am-5pm EST
    `
  },
  privacy: {
    title: 'Privacy Policy',
    content: `
      Your privacy is important to us. This policy outlines how we collect,
      use, and protect your personal information when you use our service.
      
      Data Collection:
      • Basic user information
      • Viewing history
      • Preferences
      
      We never share your personal information with third parties.
    `
  }
};

export default function HelpPage() {
  const router = useRouter();
  const { slug } = router.query;
  
  const page = !slug ? 'index' : slug[0];
  const content = helpContent[page];

  if (!content) {
    return (
      <Layout>
        <div className="error-page">
          <h1>Help Page Not Found</h1>
          <button className="button" onClick={() => router.push('/help')}>
            Back to Help Center
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="help-section">
        <h1>{content.title}</h1>
        {page === 'index' ? (
          <div>
            <p style={{ whiteSpace: 'pre-line' }}>{content.content}</p>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
              <button className="button" onClick={() => router.push('/help/faqs')}>
                FAQs
              </button>
              <button className="button" onClick={() => router.push('/help/contact')}>
                Contact
              </button>
              <button className="button" onClick={() => router.push('/help/privacy')}>
                Privacy
              </button>
            </div>
          </div>
        ) : (
          <div>
            <button
              className="button"
              onClick={() => router.push('/help')}
              style={{ marginBottom: '2rem' }}
            >
              Back to Help Center
            </button>
            <p style={{ whiteSpace: 'pre-line' }}>{content.content}</p>
          </div>
        )}
      </div>
    </Layout>
  );
} 