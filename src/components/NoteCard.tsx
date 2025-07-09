import type { Note } from "../types/note";

type Props={
    note:Note;
}
export default function NoteCard ({note}:Props){
    return (
        <p>{note.title}</p>
    )
}