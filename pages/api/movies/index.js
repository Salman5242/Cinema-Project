import { database } from '../../../lib/firebase';
import { ref, get } from 'firebase/database';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const moviesRef = ref(database, 'movies');
    const snapshot = await get(moviesRef);
    const movies = snapshot.val() || {};

    // Convert the object to an array with IDs
    const moviesArray = Object.entries(movies).map(([id, data]) => ({
      id,
      ...data
    }));

    res.status(200).json(moviesArray);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: 'Error fetching movies' });
  }
} 