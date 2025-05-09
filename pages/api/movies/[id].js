import { database } from '../../../lib/firebase';
import { ref, get } from 'firebase/database';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    const movieRef = ref(database, `movies/${id}`);
    const snapshot = await get(movieRef);

    if (!snapshot.exists()) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const movie = {
      id,
      ...snapshot.val()
    };

    res.status(200).json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ message: 'Error fetching movie' });
  }
} 