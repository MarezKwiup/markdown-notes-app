import Dexie,{type EntityTable} from 'dexie';
import { type Note } from '../types/note';

const db=new Dexie('NotesDb') as Dexie & {
    notes:EntityTable<Note,'id'>;
}

db.version(1).stores({
  notes: 'id, updatedAt, title' // primary key "id" (for the runtime!)
});

export {db};

