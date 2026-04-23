import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageSquareMore } from "lucide-react";

interface MessageItemProps {
  message: {
    id: number;
    name: string;
    subject: string;
    time: string;
    duration: string;
    count?: number;
    avatarsCount: number;
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
  const checked = selectedIds.includes(message.id);

  return (
    <div
      className={`flex w-full h-[100px] gap-3 p-3 border-b-2 border-black hover transition-colors  group ${checked ? "bg-green-600 text-white" : "hover:bg-green-500 hover:text-white"}`}
    >
      <div className="flex-shrink-0">
        {!isSelectionMode && (
          <Avatar className="h-12 w-12 border-2 border-black group-hover:hidden">
            <AvatarFallback className="font-bold bg-white text-black">
              OA
            </AvatarFallback>
          </Avatar>
        )}

        <Checkbox
          checked={checked}
          onCheckedChange={() => {
            handleSetItem(message.id);
          }}
          className={`hidden rounded-full h-8 w-8  ${isSelectionMode ? "block" : "hidden group-hover:block"} data-[state=checked]:bg-green-950`}
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
                className={`flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full border-2 group-hover:border-white  ${checked ? "group-hover:border-white! text-white" : "text-black border-black group-hover:text-white"} text-[10px] font-black`}
              >
                {message.count}
              </div>
            )}
            <p className="text-sm font-medium truncate">{message.subject}</p>
          </div>
          <span className={`text-[11px] font-bold  ${checked ? 'text-white' : 'text-zinc-500 group-hover:text-white'}`}>-2 horas</span>
        </div>

        <div className="flex justify-between items-end">
          <div className="flex items-center gap-1.5">
            <span className="text-xs">
              <MessageSquareMore size={16} />
            </span>
            <span
              className={`text-[12px] font-bold ${checked ? "group-hover:border-white! text-white" : "text-black border-black group-hover:text-white"}`}
            >
              Caixa de entrada
            </span>
          </div>
          <div className="flex -space-x-2.5">
            {[1, 2, 3].map((i) => (
              <Avatar
                key={i}
                className={`${checked ? "border-white" : "border-black group-hover:border-white"} h-6 w-6 border-2 `}
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
