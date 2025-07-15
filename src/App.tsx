import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NoteList from "./pages/NoteList";
import NoteEditor from "./pages/NoteEditor";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  useEffect(() => {
    navigate('/',{replace:true})
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r h-screen border-[#e5e7eb]">
        <NoteList/>
      </div>

      <div className="w-2/3">
        <NoteEditor key={path} />
      </div>
    </div>
  );
}
