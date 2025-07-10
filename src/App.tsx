import { useLocation } from "react-router-dom";
import NoteList from "./pages/NoteList";
import NoteEditor from "./pages/NoteEditor";

export default function App() {
  const location = useLocation();
  const path = location.pathname;
  console.log("Path is currently : ", path);

  return (
    <div className="flex h-screen">
      <div className="w-1/3 border-r h-screen overflow-y-auto">
        <NoteList/>
      </div>

      <div className="w-2/3">
        <NoteEditor key={path} />
      </div>
    </div>
  );
}
