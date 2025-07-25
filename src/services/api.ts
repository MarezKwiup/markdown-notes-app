import axios from "axios";
import { type Note } from "../types/note";

const API = axios.create({
  baseURL: "http://localhost:4000",
});

export const fetchNotes = () => API.get("/notes");
export const createNote = (note: Note) => API.post("/notes", note);
export const updateNote = async (note: Note) => {
  console.log("Note in the update api is : ",note);
  const res= await API.put(`/notes/${note.id}`, note);
  console.log("Updated note is : ",res);
  return res;
};
export const deleteNote = (id: string) => API.delete(`/notes/${id}`);
export const fetchNotesById = async (id: string): Promise<any> => {
  try {
    const res =  await API.get(`/notes/${id}`);
    console.log("Result is (from the find by ID API ): ",res)
    return true;
  } catch (e){
    console.log("Error while fetching the note by id is : ",e);
    return false;
  }
};
