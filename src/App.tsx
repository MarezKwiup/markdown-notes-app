import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NoteList from "./pages/NoteList";
import NoteEditor from "./pages/NoteEditor";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  useEffect(() => {
    navigate('/', { replace: true });
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/4 h-full border-r border-[#e5e7eb] bg-[#f9fafb]">
        <NoteList />
      </div>

      <div className="w-3/4 h-full">
        <NoteEditor key={path} />
      </div>
    </div>
  );
}
