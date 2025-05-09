import { database } from '../../../lib/firebase';
import { ref, get } from 'firebase/database';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const directorsRef = ref(database, 'directors');
    const snapshot = await get(directorsRef);
    const directors = snapshot.val() || {};

    // Convert the object to an array with IDs
    const directorsArray = Object.entries(directors).map(([id, data]) => ({
      id,
      ...data
    }));

    res.status(200).json(directorsArray);
  } catch (error) {
    console.error('Error fetching directors:', error);
    res.status(500).json({ message: 'Error fetching directors' });
  }
} 