import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ChevronDown, Filter } from "lucide-react";
import MessageList from "./message-list";
import { useMessages } from "@/hooks/messages";

const MainDashboard = () => {
  const {
    query,
    isSelectionMode,
    filteredMessages,
    data,
    allChecked,
    selectedIds,
    messages,
    setQuery,
    handleAllCheckedMessages,
    handleRemoveItens,
    handleSelect,
  } = useMessages();

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
        {data?.subMenuItems &&
          messages?.subMenuItems &&
          filteredMessages.map((message) => (
            <MessageList
              key={`${message.id}-message`}
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
