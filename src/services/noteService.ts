import { db } from "../db/notesDb";
import { type Note } from "../types/note";

export const createNote = async (note:Note)=>{
    console.log("New note created!! ");
    await db.notes.add(note);
    console.log("Going to return!!!");
}

export const updateNote = async (note:Note)=>{
    await db.notes.put(note);
}

export const deleteNote = async (id:string)=>{
    console.log("Going to delete the note!");
    await db.notes.delete(id);
    console.log("note deleted!");
}

export const getAllNotes = async ():Promise<Note[]>=>{
    return await db.notes.orderBy('updatedAt').reverse().toArray();
}

export const getNoteById = async (id: string): Promise<Note | undefined> => {
  return await db.notes.get(id);
};
