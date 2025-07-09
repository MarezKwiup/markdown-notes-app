import { db } from "../db/notesDb";
import { type Note } from "../types/note";

export const createNote = async (note:Note)=>{
    await db.notes.add(note);
}

export const updateNote = async (note:Note)=>{
    await db.notes.put(note);
}

export const deleteNote = async (id:string)=>{
    await db.notes.delete(id);
}

export const getAllNotes = async ():Promise<Note[]>=>{
    return await db.notes.orderBy('updatedAt').reverse().toArray();
}

