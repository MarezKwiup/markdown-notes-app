import { useLocation } from "react-router-dom";

const NoteEditor = () =>{
    const location=useLocation();
    const path=location.pathname;
    return <p>Current path is : {path}</p>
}

export default NoteEditor;