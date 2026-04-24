import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import type { MessageItem } from "@/types";
import { MessageSquareMore } from "lucide-react";

interface MessageItemProps {
  message: MessageItem;
  selectedIds: number[];
  isSelectionMode: boolean;
  handleSetItem: (id: number) => void;
}

const MessageList = ({
  message,
  isSelectionMode,
  handleSetItem,
  selectedIds,
}: MessageItemProps) => {
  const checked = selectedIds.includes(message.id);
  const name = `${message.name.split("")[0]}${message.name.split(" ")[1][0]}`;

  return (
    <div
      className={`flex w-full h-[100px] gap-3 p-3 border-b-2 border-black hover transition-colors  group ${checked ? "bg-green-600 text-white dark:bg-slate-700" : "hover:bg-green-500 hover:text-white dark:bg-slate-400"}`}
    >
      <div className="flex-shrink-0">
        {!isSelectionMode && (
          <Avatar className="h-12 w-12 border-2 border-black group-hover:hidden dark:border-white">
            <AvatarFallback className="font-bold bg-white text-black uppercase">
              {name}
            </AvatarFallback>
          </Avatar>
        )}

        <Checkbox
          checked={checked}
          onCheckedChange={() => {
            handleSetItem(message.id);
          }}
          className={` rounded-full h-8 w-8  transition-all duration-200 ease-in-out opacity-0 scale-75 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
            ${isSelectionMode ? "opacity-100 scale-100 pointer-events-auto" : ""} data-[state=checked]:bg-green-950`}
        />
      </div>

      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <span className="font-bold text-[15px]">{message.name}</span>
          <span className="text-[11px] font-medium">{message.time}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 min-w-0">
            {message.count && (
              <div
                className={`flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full border-2 group-hover:border-white  ${checked ? "group-hover:border-white! text-white" : "text-black border-black group-hover:text-white"} text-[10px] font-black dark:border-white dark:text-white`}
              >
                {message.count}
              </div>
            )}
            <p className="text-sm font-medium truncate">{message.subject}</p>
          </div>
          <span
            className={`text-[11px] font-bold  ${checked ? "text-white" : "text-zinc-500 group-hover:text-white"} dark:text-white`}
          >
            -2 horas
          </span>
        </div>

        <div className="flex justify-between items-end">
          <div className="flex items-center gap-1.5">
            <span className="text-xs">
              <MessageSquareMore size={16} />
            </span>
            <span
              className={`text-[12px] font-bold ${checked ? "group-hover:border-white! text-white" : "text-black border-black group-hover:text-white"} dark:text-white`}
            >
              Caixa de entrada
            </span>
          </div>
          <div className="flex -space-x-2.5">
            {[1, 2, 3].map((i) => (
              <Avatar
                key={i}
                className={`${checked ? "border-white" : "border-black group-hover:border-white"} h-6 w-6 border-2 dark:border-slate-600 `}
              >
                <AvatarFallback className="text-[8px] font-bold bg-white">
                  OA
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageList;
