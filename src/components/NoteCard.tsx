import { NavLink } from "react-router-dom";
import type { Note } from "../types/note";
import { MdErrorOutline } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoTrashBin } from "react-icons/io5";

type Props = {
  note: Note;
};

export default function NoteCard({ note }: Props) {
  const date = new Date(note.updatedAt);
  const formatted = date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="relative group bg-[#ffffff] hover:bg-[#F3F4F6] w-9/10 flex justify-center rounded-[1vw]">
      <NavLink
        to={`edit/${note.id}`}
        className={({ isActive }) =>
          `block w-full rounded-lg px-4 py-3 transition ${
            isActive
              ? "bg-[#DBEAFE] border border-[#93C5FD] rounded-[1vw]"
              : "bg-white"
          }`
        }
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <div className="flex flex-col p-[10px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="font-[600] text-[17px] mr-[5px] line-clamp-2">
                {note.title}
              </span>
              {note.synced ? (
                <IoIosCheckmarkCircleOutline color="green" size="13px" />
              ) : (
                <MdErrorOutline color="red" size="13px" />
              )}
            </div>
          </div>
          <p className="text-[15px] text-[#3f3e3e] line-clamp-2">{note.content}</p>
          <span className="text-[13px] text-[#3f3e3e]">{formatted}</span>
        </div>
      </NavLink>

      {/* 🔴 Delete button on hover */}
      <button
        onClick={() => console.log("Delete", note.id)}
        className="absolute top-[10px] right-[10px] opacity-0 group-hover:opacity-100 text-gray-400 hover:text-[#de3535] transition bg-transparent border-none outline-none"
      >
        <IoTrashBin size={13} />
      </button>
    </div>
  );
}
