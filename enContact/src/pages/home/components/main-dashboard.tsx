import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ChevronDown, Filter } from "lucide-react";
import { useState } from "react";
import { useQueryState } from "nuqs";
import MessageList from "./message-list";
import type { MessageSelected } from "@/types";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MainDashboard = () => {
  const [messages, setMessages] = useState<MessageSelected>();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [allChecked, setIsAllChecked] = useState(false);
  const [query, setQuery] = useQueryState("name", { defaultValue: "" });
  const [searchParams] = useSearchParams();
  const isSelectionMode = selectedIds.length > 0;

  const idAccount = searchParams.get("id");

  const { data } = useQuery({
    queryKey: ["messagesList", idAccount],
    queryFn: async () => {
      const response = await axios.get<MessageSelected | undefined>(
        `https://my-json-server.typicode.com/EnkiGroup/DesafioFrontEnd2026Jr/items/${idAccount}`,
      );
      setMessages(response.data);
      return response.data;
    },
    enabled: !!idAccount,
  });

  const handleSelect = (id: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [...prev, id];
    });
  };

  const handleRemoveItens = (ids: number[]) => {
    setMessages((prev) => {
      return {
        ...prev,
        subMenuItems: prev.subMenuItems.filter(
          (item) => !ids.includes(Number(item.id)),
        ),
      };
    });
    setSelectedIds([]);
  };

  const handleAllCheckedMessages = () => {
    const newValue = !allChecked;
    setIsAllChecked(newValue);
    if (newValue) {
      setSelectedIds(messages.subMenuItems.map((item) => Number(item.id)));
    } else {
      setSelectedIds([]);
    }
  };

  const filteredMessages = messages?.subMenuItems.filter((msg) =>
    msg.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );

  return (
    <div>
      <div className="w-full  p-4 space-y-4 bg-white dark:bg-transparent border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="relative">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar"
            className="w-full h-10 border-2 border-black rounded-none pr-10 focus-visible:ring-0 focus-visible:ring-offset-0 font-medium"
          />
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5" />
        </div>

        <hr className="border-zinc-200" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Checkbox
              className="h-5 w-5 border-2 border-black rounded-none data-[state=checked]:bg-black dark:border-white"
              checked={allChecked}
              onCheckedChange={handleAllCheckedMessages}
            />
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="border-2 border-black dark:border-white rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all font-bold "
              >
                Atribuir
              </Button>

              <Button
                onClick={() => handleRemoveItens(selectedIds)}
                variant="outline"
                className="border-2 border-black dark:border-white rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all font-bold"
              >
                Arquivar
              </Button>

              <Button
                variant="outline"
                className="border-2 border-black dark:border-white rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all font-bold"
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

      <div className="flex flex-col w-full bg-white dark:bg-transparent border-2 border-black">
        {!messages?.subMenuItems.length && (
          <p className="p-3">Nenhuma conversa encontrada</p>
        )}
        {messages?.subMenuItems &&
          filteredMessages.map((message, index) => (
            <MessageList
              key={Number(message.id) * index}
              message={{ id: data.id, menus: message }}
              isSelectionMode={isSelectionMode}
              handleSetItem={handleSelect}
              selectedIds={selectedIds}
            />
          ))}
      </div>
    </div>
  );
};

export default MainDashboard;
