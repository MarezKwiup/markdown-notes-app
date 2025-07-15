import { type Note } from "../types/note";
import { MdWifiOff } from "react-icons/md";
import { MdWifi } from "react-icons/md";
type Props = {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  note: Note | undefined;
};

export default function TopBar({ setEditMode, note }: Props) {
  const online = navigator.onLine;
  console.log("Fetched note is : ", note);
  console.log("Is the user online? ", online);

  return (
    <div className="flex items-center border-b border-[#e5e7eb] px-[30px] py-2 w-full">
      <div>
        {online ? (
          <div className="flex items-center">
            <MdWifi color="#22c55d" size={25} className="mb-[5px]" />
            <p className="ml-[3px] text-[#6b7280]">Online</p>
          </div>
        ) : (
          <div>
            <MdWifiOff color="#ef4444" size={25} />
            Offline
          </div>
        )}
      </div>
      <div>Synced or not</div>
      <button>Edit button</button>
      <button>View button</button>
    </div>
  );
}
