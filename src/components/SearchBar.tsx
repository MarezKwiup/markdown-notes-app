import AddNote from "./AddNote";
import { type Note } from "../types/note";
import { useCallback, useMemo, useState, useEffect } from "react";
import Fuse from "fuse.js";
import debounce from "lodash.debounce";

type Props = {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  setAllNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

const SearchBar = ({ setNotes, notes, setAllNotes }: Props) => {
  const [search, setSearch] = useState<string>("");

  const fuse = useMemo(() => {
    return new Fuse(notes, {
      keys: ["title", "content"],
      threshold: 0.3,
    });
  }, [notes]);

  const performSearch = (query: string) => {
    if (query.trim() === "") {
      setNotes(notes);
      return;
    }

    const results = fuse.search(query);
    console.log("Results of the search query are : ", results);
    setNotes(results.map((r) => r.item));
  };

  const debouncedSearch = useCallback(debounce(performSearch, 300), [
    fuse,
    notes,
  ]);

  useEffect(() => {
    debouncedSearch(search);
    return debouncedSearch.cancel;
  }, [search, debouncedSearch]);

  return (
    <div className="border-b border-[#e5e7eb]">
      <div className="flex flex-col">
        <div className="flex justify-between p-[20px]">
          <span className="font-[1000] text-[25px] mt-[4px] line-clamp-2">
            Notes
          </span>
          {/* <FaSquarePlus size="35px" color="#2463eb"/> */}
          <AddNote setNotes={setNotes} notes={notes} setAllNotes={setAllNotes}/>
        </div>
        <input
          type="text"
          placeholder="Search notes..."
          className="mx-[20px] mb-[12px] px-[12px] py-[8px] rounded-[8px] border focus:outline-blue-500"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
