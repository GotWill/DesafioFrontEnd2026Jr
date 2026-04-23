import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ChevronDown, Filter } from "lucide-react";
import { useState } from "react";
import MessageList from "./message-list";

interface MessageItemProps {
  id: number;
  name: string;
  subject: string;
  time: string;
  duration: string;
  count?: number;
  avatarsCount: number;
}

const MainDashboard = () => {
  const [messages, setMessages] = useState<MessageItemProps[]>([
    {
      id: 1,
      name: "Willian",
      subject: "Responde ai meu",
      time: "Hoje, 11:42",
      duration: "30 min",
      count: 2,
      avatarsCount: 3,
    },
    {
      id: 2,
      name: "Agnaldo Barbosa",
      subject: "Responde ai meu",
      time: "Hoje, 11:42",
      duration: "30 min",
      count: 5,
      avatarsCount: 3,
    },
    {
      id: 3,
      name: "Ester",
      subject: "Responde ai meu",
      time: "Hoje, 11:42",
      duration: "30 min",
      count: 6,
      avatarsCount: 3,
    },
    {
      id: 4,
      name: "Rogerio",
      subject: "Responde ai meu",
      time: "Hoje, 11:42",
      duration: "30 min",
      avatarsCount: 3,
    },
  ]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const isSelectionMode = selectedIds.length > 0;

  const handleSelect = (id: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [...prev, id];
    });
  };


  return (
    <div>
      <div className="w-full  p-4 space-y-4 bg-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="relative">
          <Input
            placeholder="Pesquisar"
            className="w-full h-10 border-2 border-black rounded-none pr-10 focus-visible:ring-0 focus-visible:ring-offset-0 font-medium"
          />
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5" />
        </div>

        <hr className="border-zinc-200" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Checkbox className="h-5 w-5 border-2 border-black rounded-none data-[state=checked]:bg-black" />
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all font-bold"
              >
                Atribuir
              </Button>

              <Button
                variant="outline"
                className="border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all font-bold"
              >
                Arquivar
              </Button>

              <Button
                variant="outline"
                className="border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all font-bold"
              >
                Agendar
              </Button>
            </div>
          </div>

          <Button variant="ghost" size="icon" className="hover:bg-zinc-100">
            <Filter className="h-6 w-6 stroke-[2.5px]" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col w-full bg-white border-2 border-black">
        {messages.map((message) => (
          <MessageList
            key={message.id}
            message={message}
            isSelectionMode={isSelectionMode}
            handleSetItem={handleSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default MainDashboard;
