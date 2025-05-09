import { db } from '../../../lib/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    // Get director details
    const directorRef = doc(db, 'directors', id);
    const directorSnap = await getDoc(directorRef);

    if (!directorSnap.exists()) {
      return res.status(404).json({ message: 'Director not found' });
    }

    const director = {
      id: directorSnap.id,
      ...directorSnap.data()
    };

    // Get movies directed by this director
    const moviesRef = collection(db, 'movies');
    const q = query(moviesRef, where('directorId', '==', id));
    const moviesSnapshot = await getDocs(q);
    const movies = moviesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Combine director info with their movies
    const directorWithMovies = {
      ...director,
      movies
    };

    res.status(200).json(directorWithMovies);
  } catch (error) {
    console.error('Error fetching director:', error);
    res.status(500).json({ message: 'Error fetching director' });
  }
} 