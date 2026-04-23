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
import { ChevronDown, Moon, MoreVertical, Sun } from "lucide-react";
import AccountList from "./components/account-list";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import MainDashboard from "./components/main-dashboard";
import { useContext, useEffect } from "react";
import { userContext } from "@/context/user";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/theme-provider";

interface MessageReponse {
  id: number;
  name: string;
  subMenus: {
    id: number;
    name: string;
  }[];
}

const Home = () => {
  const { logout, isAutentincated } = useContext(userContext);
  const { setTheme } = useTheme();

  const navigate = useNavigate();

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
    enabled: !!isAutentincated,
  });

  useEffect(() => {
    if (!isAutentincated) {
      navigate("/login");
    }
  }, [isAutentincated, navigate]);

  if (!isAutentincated) {
    return null;
  }

  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-screen border"
    >
      <ResizablePanel
        defaultSize={20}
        minSize={300}
        maxSize={500}
        className="bg-white dark:bg-background"
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
                <DropdownMenuItem className="text-destructive" onClick={logout}>
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button className="flex items-center gap-1 border-2 border-black dark:border-white px-3 py-1 font-semibold text-sm hover:bg-zinc-100 transition-colors">
              New <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          <hr className="mb-4 border-zinc-200" />

          <ScrollArea className="flex-1">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm font-medium px-2">
                <div className="flex items-center gap-2">
                  <span className="dark:text-white">Favoritas</span>
                  <MoreVertical className="h-4 w-4 text-zinc-400" />
                </div>
                <span className="text-zinc-500 dark:text-white">
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </aside>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={80}>
        <MainDashboard />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Home;
