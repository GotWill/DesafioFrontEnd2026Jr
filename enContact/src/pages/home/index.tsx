import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MoreVertical } from "lucide-react";
import AccountList from "./components/account-list";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import MainDashboard from "./components/main-dashboard";
import { useContext, useEffect } from "react";
import { userContext } from "@/context/user";
import { useNavigate } from "react-router-dom";
import DropdownTheme from "./components/dropdown-theme";
import DropdownHeader from "./components/dropdown-header";

interface MessageReponse {
  id: number;
  name: string;
  subMenus: {
    id: number;
    name: string;
  }[];
}

const Home = () => {
  const { isAutentincated } = useContext(userContext);

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
          <DropdownHeader />
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

          <DropdownTheme />
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
