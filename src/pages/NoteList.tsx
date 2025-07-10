import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import {
  createNote,
  updateNote,
  deleteNote,
  getAllNotes,
} from "../services/noteService";
import { type Note } from "../types/note";
import NoteCard from "../components/NoteCard";
const NoteList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  useEffect(() => {
    const fn = async () => {
      const notes = await getAllNotes();
      console.log("Notes are : ", notes);
      setNotes(notes);
    };
    fn();
  }, []);
  return (
    <>
      <div className="bg-[#f9fafb]">
        <SearchBar />
        {notes.map((note: Note) => (
          <div
            className="flex justify-center m-[8px]" 
          >
            <NoteCard note={note} />
          </div>
        ))}
      </div>
    </>
  );
};

export default NoteList;
