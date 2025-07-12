import { FaSquarePlus } from "react-icons/fa6";
import AddNote from "./AddNote";
import { type Note } from "../types/note";

type Props = {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};


const SearchBar=({setNotes,notes}:Props)=>{
    return (
        <div className="border-b border-gray-300">
            <div className="flex flex-col">
                <div className="flex justify-between p-[20px]">
                    <span className="font-[1000] text-[25px] mt-[6px] line-clamp-2">Notes</span>
                    {/* <FaSquarePlus size="35px" color="#2463eb"/> */}
                    <AddNote setNotes={setNotes} notes={notes}/>

                </div>
                <p>2</p>
            </div>
        </div>
    )
}

export default SearchBar;