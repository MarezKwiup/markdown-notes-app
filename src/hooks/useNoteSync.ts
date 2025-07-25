import { useEffect } from "react";
import {
  getAllNotes,
  updateNote,
  deleteNote as deleteFromDexie,
} from "../services/noteService";
import * as backend from "../services/api";

export default function useNoteSync() {
  useEffect(() => {
    const syncNotes = async () => {
      const allNotes = await getAllNotes();
      const unsynced = allNotes.filter((note) => !note.synced || note.syncing);

      for (const note of unsynced) {
        console.log("Going to sync the note : ", note.title);
        try {
          if (note.isDeleted) {
            const noteExists = await backend.fetchNotesById(note.id);
            if(noteExists) await backend.deleteNote(note.id);
            console.log(
              "Note with title : ",
              note.title,
              " deleted from the backend "
            );
            await deleteFromDexie(note.id);
          } else {
            const noteExists = await backend.fetchNotesById(note.id);
            if (noteExists) await backend.updateNote(note);
            else await backend.createNote(note);
            await updateNote({ ...note, synced: true, syncing: false });
          }
        } catch (error) {
          console.error("Sync error for note", note.id, error);
          await updateNote({ ...note, syncing: false });
        }
      }
    };

    const handleOnline = () => {
      console.log("Back online, starting sync...");
      syncNotes();
    };

    if (navigator.onLine) handleOnline();

    window.addEventListener("online", handleOnline);

    return () => window.removeEventListener("online", handleOnline);
  }, []);
}
