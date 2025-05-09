import { db } from '../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    const movieRef = doc(db, 'movies', id);
    const movieSnap = await getDoc(movieRef);

    if (!movieSnap.exists()) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const movie = {
      id: movieSnap.id,
      ...movieSnap.data()
    };

    res.status(200).json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ message: 'Error fetching movie' });
  }
} 