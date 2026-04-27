import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import type { SubMenuItems } from "@/types";
import { MessageSquareMore } from "lucide-react";

interface MessageItemProps {
  message: {
    id: number;
    menus: SubMenuItems | undefined;
  };
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
  const checked = selectedIds.includes(Number(message.menus.id));

  return (
    <div
    className={`flex w-full h-[100px] gap-3 p-3 border-b-2 border-black transition-colors group ${
      checked 
        ? "bg-green-600 text-white dark:bg-slate-700" 
        : "hover:bg-green-500 hover:text-white dark:bg-slate-400"
    }`}
  >
    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center relative">
      
      {!isSelectionMode && (
        <Avatar 
          className={`h-8 w-8 border-2 border-black dark:border-white transition-opacity duration-200 
            ${checked ? "opacity-0" : "opacity-100 group-hover:opacity-0"}`}
        >
          <AvatarFallback className="font-bold bg-white text-black uppercase">
            {message.menus.owner}
          </AvatarFallback>
        </Avatar>
      )}
  
      <Checkbox
        checked={checked}
        onCheckedChange={() => {
          handleSetItem(Number(message.menus.id));
        }}
        className={`absolute rounded-full h-8 w-8 transition-all duration-200 ease-in-out z-10
          ${isSelectionMode || checked 
            ? "opacity-100 scale-100 pointer-events-auto" 
            : "opacity-0 scale-75 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto"
          } data-[state=checked]:bg-green-950`}
      />
    </div>
  
    {/* Conteúdo do Card */}
    <div className="flex flex-col justify-between flex-1 min-w-0">
      <div className="flex justify-between items-center">
        <span className="font-bold text-[15px] truncate">{message.menus.name}</span>
        <span className="text-[11px] font-medium flex-shrink-0">Hoje, 11:42</span>
      </div>
  
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={`flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full border-2 transition-colors
              ${checked 
                ? "border-white text-white" 
                : "border-black text-black group-hover:border-white group-hover:text-white"
              } text-[10px] font-black dark:border-white dark:text-white`}
          >
            6
          </div>
  
          <p className="text-sm font-medium truncate">
            {message.menus.subject}
          </p>
        </div>
        <span
          className={`text-[11px] font-bold flex-shrink-0 ${
            checked ? "text-white" : "text-zinc-500 group-hover:text-white"
          } dark:text-white`}
        >
          -2 horas
        </span>
      </div>
  
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-xs flex-shrink-0">
            <MessageSquareMore size={16} />
          </span>
          <span
            className={`text-[12px] font-bold truncate ${
              checked ? "text-white" : "text-black group-hover:text-white"
            } dark:text-white`}
          >
            Caixa de entrada
          </span>
        </div>
        
        <div className="flex -space-x-2.5 flex-shrink-0 ml-2">
          {message.menus.users.map((user, index) => (
            <Avatar
              key={index}
              className={`h-6 w-6 border-2 transition-colors ${
                checked ? "border-white" : "border-black group-hover:border-white"
              } dark:border-slate-600`}
            >
              <AvatarFallback className="text-[8px] font-bold bg-white text-black">
                {user}
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
