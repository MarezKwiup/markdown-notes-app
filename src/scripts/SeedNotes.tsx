import { db } from '../db/notesDb';
import axios from 'axios';
import { useEffect } from 'react';

export default function SeedNotes() {
  useEffect(() => {
    const seed = async () => {
      try {
        const response = await axios.get('http://localhost:4000/notes');
        const notes = response.data;

        await db.notes.clear(); // optional: wipe current IndexedDB
        await db.notes.bulkPut(notes);

        console.log('✅ Seeded notes into IndexedDB:', notes.length);
      } catch (err) {
        console.error('❌ Failed to seed notes:', err);
      }
    };

    seed();
  }, []);

  return <div className="p-4 text-sm text-green-700">Seeding notes...</div>;
}
