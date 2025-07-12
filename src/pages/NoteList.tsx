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
  const [allNotes, setAllNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fn = async () => {
      const notes = await getAllNotes();
      console.log("Notes are : ", notes);
      setNotes(notes);
      setAllNotes(notes);
    };
    fn();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteNote(id);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id)); //filter copy
    setAllNotes((prevNotes) => prevNotes.filter((note) => note.id !== id)); //source of truth
  };
  return (
    <>
      <div className="bg-[#f9fafb]">
        <SearchBar setNotes={setNotes} notes={allNotes} />
        <div className="flex flex-col h-screen overflow-y-auto">
          {[...notes]
            .sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            )
            .map((note: Note) => (
              <div key={note.id} className="flex justify-center m-[8px]">
                <NoteCard note={note} onDelete={handleDelete} />
              </div>
            ))}
          {notes.length === 0 && (
            <p className="text-center mt-8 text-gray-500 text-sm">
              No notes match your search.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default NoteList;
