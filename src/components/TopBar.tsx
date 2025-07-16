import { type Note } from "../types/note";
import { MdWifiOff } from "react-icons/md";
import { MdWifi } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";
import { FaSyncAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoEyeSharp } from "react-icons/io5";
import { useState } from "react";

type Props = {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  note: Note | undefined;
  editMode: boolean;
};

export default function TopBar({ setEditMode, note, editMode }: Props) {
  const online = navigator.onLine;
  console.log("Fetched note is : ", note);
  console.log("Is the user online? ", online);

  const [hoveredEdit, setHoveredEdit] = useState(false);
  const [hoveredView, setHoveredView] = useState(false);

  const handleEdit = () => {
    setEditMode(true)
  };

  const handleView = () => {
    setEditMode(false)
  };

  return (
    <div className="flex items-center border-b border-[#e5e7eb] px-[30px] py-2 justify-between">
      <div className="flex">
        <div>
          {online ? (
            <div className="flex items-center mr-[10px]">
              <MdWifi color="#22c55d" size={20} className="mb-[5px]" />
              <p className="ml-[3px] text-[#6b7280]">Online</p>
            </div>
          ) : (
            <div className="flex items-center mr-[10px]">
              <MdWifiOff color="#ef4444" size={20} />
              <p className="ml-[3px] text-[#6b7280]">Offline</p>
            </div>
          )}
        </div>
        <div>
          {note && note.synced ? (
            <div className="flex items-center">
              <FaSyncAlt color="#22c55d" size={15} className="mb-[5px]" />
              <p className="ml-[3px] text-[#6b7280]">Synced</p>
            </div>
          ) : (
            <div className="flex items-center">
              <MdErrorOutline color="#ef4444" size={19} />
              <p className="ml-[3px] text-[#6b7280]">Sync error</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex mr-[10px]">
        <button
          onMouseEnter={() => setHoveredEdit(true)}
          onMouseLeave={() => setHoveredEdit(false)}
          className={`p-2 rounded-md border-none outline-none focus:outline-none active:outline-none mr-[4px] ${editMode?"bg-[#dbe9fe]":"bg-transparent"} w-[45px] rounded-[3px] h-[30px]`}
          title="edit"
          onClick={handleEdit}
        >
          <FiEdit size="20px" color={editMode?"#1c4ed8":hoveredEdit ? "#4f4e4e" : "#6b7280"} />
        </button>
        <button
          onMouseEnter={() => setHoveredView(true)}
          onMouseLeave={() => setHoveredView(false)}
          className={`p-2 rounded-md border-none outline-none focus:outline-none active:outline-none mr-[4px] ${editMode?"bg-transparent":"bg-[#dbe9fe]"} w-[45px] rounded-[3px]`}
          title="view"
          onClick={handleView}
        >
          <IoEyeSharp size="20px" color={!editMode?"#1c4ed8" : hoveredView ? "#4f4e4e" : "#6b7280"} />
        </button>
      </div>
    </div>
  );
}

// #6b7280

// #dbe9fe
// #1c4ed8
