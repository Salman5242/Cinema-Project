import { database } from '../../../lib/firebase';
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    // Get director details
    const directorRef = ref(database, `directors/${id}`);
    const directorSnapshot = await get(directorRef);

    if (!directorSnapshot.exists()) {
      return res.status(404).json({ message: 'Director not found' });
    }

    const director = {
      id,
      ...directorSnapshot.val()
    };

    // Get movies directed by this director
    const moviesRef = ref(database, 'movies');
    const moviesQuery = query(moviesRef, orderByChild('directorId'), equalTo(id));
    const moviesSnapshot = await get(moviesQuery);
    const movies = moviesSnapshot.val() || {};

    // Convert the movies object to an array with IDs
    const moviesArray = Object.entries(movies).map(([id, data]) => ({
      id,
      ...data
    }));

    // Combine director info with their movies
    const directorWithMovies = {
      ...director,
      movies: moviesArray
    };

    res.status(200).json(directorWithMovies);
  } catch (error) {
    console.error('Error fetching director:', error);
    res.status(500).json({ message: 'Error fetching director' });
  }
} 