import { database } from '../../../lib/firebase';
import { ref, get } from 'firebase/database';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const genresRef = ref(database, 'genres');
    const snapshot = await get(genresRef);
    const genres = snapshot.val() || {};

    // Convert the object to an array with IDs
    const genresArray = Object.entries(genres).map(([id, data]) => ({
      id,
      ...data
    }));

    res.status(200).json(genresArray);
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ message: 'Error fetching genres' });
  }
} 