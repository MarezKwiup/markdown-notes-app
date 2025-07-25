import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { type Note } from "../types/note";
import {
  getNoteById,
  updateNote as updateLocalNote,
} from "../services/noteService";
import TopBar from "../components/TopBar";
import * as backend from "../services/api";
import MDEditor from "@uiw/react-md-editor";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { MdEditNote } from "react-icons/md";

const NoteEditor = () => {
  const [note, setNote] = useState<Note | undefined>(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);
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

  const syncNote = async (updateNote: Note) => {
    try {
      console.log("Going to sync the note!!");
      const noteExists = await backend.fetchNotesById(updateNote.id);
      console.log("Note exists is  : ", noteExists);
      let result;
      if (noteExists) {
        console.log("Going to update the note!!");
        result = await backend.updateNote(updateNote);
      } else {
        console.log("Going to create a new note!! ");
        result = await backend.createNote(updateNote);
      }
      console.log("Result of the note updation is : ", result.data);
      const syncedNote = { ...updateNote, synced: true, syncing: false };
      await updateLocalNote(syncedNote);
      setNote(syncedNote);
    } catch (err) {
      console.error("Sync error: ", err);
      const failedNote = { ...updateNote, syncing: false };
      await updateLocalNote(failedNote);
      setNote(failedNote);
    }
  };

  const handleTitleChange = async (newTitle: string) => {
    console.log("Going to change the title!!");
    if (!note) return;

    const updatedNote: Note = {
      ...note,
      title: newTitle,
      updatedAt: new Date().toISOString(),
      synced: false,
      syncing: true,
    };

    setNote(updatedNote);
    await updateLocalNote(updatedNote);
    if (navigator.onLine) syncNote(updatedNote);
  };

  const handleContentChange = async (content: string) => {
    if (!note) return;

    const updatedNote: Note = {
      ...note,
      content,
      updatedAt: new Date().toISOString(),
      synced: false,
      syncing: true,
    };

    setNote(updatedNote);
    await updateLocalNote(updatedNote);
    if (navigator.onLine) syncNote(updatedNote);
  };

  return (
    <>
      {note && (
        <TopBar setEditMode={setEditMode} note={note} editMode={editMode} />
      )}
      <div className="p-4" data-color-mode="light">
        {note ? (
          <>
            <div>
              {editMode ? (
                <input
                  value={note.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="text-[25px] font-[550] mb-[20px] border-b border-[#e5e7eb] py-[21px] pl-[15px] w-full bg-transparent focus:outline-none focus:border-blue-500"
                />
              ) : (
                <h1 className="text-xl font-bold mb-[20px] border-b border-[#e5e7eb] py-[7.4px]">
                  <span className="ml-[15px]">{note.title}</span>
                </h1>
              )}
            </div>

            {editMode ? (
              <MDEditor
                value={note.content}
                height={500}
                onChange={(val) => handleContentChange(val || "")}
              />
            ) : (
              <div className="prose max-w-none ml-[15px]">
                <MarkdownPreview source={note.content} />
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-screen text-center text-gray-500 bg-[#f9fafb]">
            <MdEditNote color="#d1d5db" size={90} className="mb-4" />
            <p className="text-[30px] text-[#6b7280]">
              Select a note to start editing
            </p>
            <p className="text-[18px] text-[#6b7280]">
              Create a new note or choose from the sidebar
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default NoteEditor;
