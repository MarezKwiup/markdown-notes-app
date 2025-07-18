import { FaSquarePlus } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNote } from "../services/noteService";
import { type Note } from "../types/note";

type Props = {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  setAllNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};


const AddNote = ({ setNotes, notes, setAllNotes }: Props) => {
  const [hovered, setHovered] = useState(false);
  const navigate=useNavigate();

  const currentDate = new Date().toISOString();

  const createNewNote = async () => {
    const newNote :Note= {
      id: crypto.randomUUID(),
      title: "Untitled",
      content: "Untitled",
      updatedAt: currentDate,
      synced: false,
    };
    await createNote(newNote);

    console.log("Here boi");
    setNotes(prev => [...prev, newNote]);
    setAllNotes(prev => [...prev, newNote]);
    navigate(`/edit/${newNote.id}`);
  };

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-2 rounded-md bg-transparent border-none outline-none focus:outline-none active:outline-none"
      title="Add Note"
      onClick={createNewNote}
    >
      <FaSquarePlus size="35px" color={hovered ? "#1d4ed8" : "#2463eb"} />
    </button>
  );
};

export default AddNote;
