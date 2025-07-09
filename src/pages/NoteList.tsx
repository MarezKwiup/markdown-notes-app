import SearchBar from "../components/SearchBar";
import { useEffect,useState } from "react";
import { createNote,updateNote,deleteNote,getAllNotes } from "../services/noteService";
import { type Note } from "../types/note";
import NoteCard from "../components/NoteCard";
const NoteList = () =>{
    const [notes,setNotes]=useState<Note[]>([]);
    useEffect(()=>{
        const fn = async ()=>{
            const notes=await getAllNotes();
            console.log("Notes are : ",notes)
            setNotes(notes);
        }
        fn();
    },[])
    return <>
        <SearchBar/>
        {notes.map((note:Note)=><NoteCard note={note}/>)}
    </>
}

export default NoteList;