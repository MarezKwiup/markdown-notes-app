import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { type Note } from "../types/note";
import { getNoteById } from "../services/noteService";
import TopBar from "../components/TopBar";

const NoteEditor = () => {
  const [note, setNote] = useState<Note | undefined>(undefined);
  const [editMode,setEditMode]=useState<boolean>(false);
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    if (!id) {
      setNote(undefined);
      return;
    }

    const fetchNote = async () => {
      const currentNote = await getNoteById(id);
      setNote(currentNote);
    };

    fetchNote();
  }, [id]);

  return (
    <>
    {note&&<TopBar setEditMode={setEditMode} note={note} editMode={editMode}/>}
      <div className="p-4">
        {note ? (
          <>
            <h1 className="text-xl font-bold">{note.title}</h1>
            <p className="mt-2">{note.content}</p>
          </>
        ) : (
          <p className="text-gray-500 text-sm">
            Select a note to start editing...
          </p>
        )}
      </div>
    </>
  );
};

export default NoteEditor;
