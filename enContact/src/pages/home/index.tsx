import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, MoreVertical } from "lucide-react";
import AccountList from "./components/account-list";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

interface MessageReponse {
  id: number;
  name: string;
  subMenus: {
    id: number;
    name: string;
  }[];
}

const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await axios.get(
        "https://my-json-server.typicode.com/EnkiGroup/DesafioFrontEnd2026Jr/menus",
      );

      const reponseData = response.data as MessageReponse[];
      return reponseData.map((menu) => ({
        ...menu,
        items: menu.subMenus,
      }));
    },
  });

  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-screen border"
    >
      <ResizablePanel
        defaultSize={20}
        minSize={300}
        maxSize={500}
        className="bg-white"
      >
        <aside className="flex h-full flex-col p-4">
          <div className="flex items-center justify-between mb-6">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="relative cursor-pointer">
                  <Avatar className="h-10 w-10 border-2 border-black">
                    <AvatarFallback className="font-bold">OA</AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="text-destructive">
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button className="flex items-center gap-1 border-2 border-black px-3 py-1 font-semibold text-sm hover:bg-zinc-100 transition-colors">
              New <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          <hr className="mb-4 border-zinc-200" />

          <ScrollArea className="flex-1">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm font-medium px-2">
                <div className="flex items-center gap-2">
                  <span>Favoritas</span>
                  <MoreVertical className="h-4 w-4 text-zinc-400" />
                </div>
                <span className="text-zinc-500">
                  {isLoading ? <Skeleton className="h-4 w-2" /> : data?.length}
                </span>
              </div>

              {isLoading ? (
                <div className="flex flex-col">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 pl-4"
                    >
                      <Skeleton key={index} className="h-4 w-4 rounded" />
                      <Skeleton className="h-5 w-5 rounded" />
                      <Skeleton className="h-4 w-32 rounded" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex flex-col gap-1">
                    {data?.map((item) => (
                      <AccountList key={item.id} fileItem={item} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </aside>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={80}>
        <main className="flex h-full items-center justify-center p-6">
          <h1 className="text-zinc-400">Conteúdo Principal</h1>
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Home;
