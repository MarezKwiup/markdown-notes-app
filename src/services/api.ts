import axios from 'axios';
import { type Note } from '../types/note';

const API = axios.create({
    baseURL:'http://localhost:4000'
})

export const fetchNotes = () => API.get('/notes');
export const createNote = (note:Note) => API.post('/notes', note);
export const updateNote = (note:Note) => API.put(`/notes/${note.id}`,note);
export const deleteNote = (id:string) => API.delete(`/notes/${id}`)