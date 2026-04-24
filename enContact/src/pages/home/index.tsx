import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MoreVertical } from "lucide-react";
import AccountList from "./components/account-list";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import MainDashboard from "./components/main-dashboard";
import { useContext, useEffect, useState } from "react";
import { userContext } from "@/context/user";
import { useNavigate } from "react-router-dom";
import DropdownTheme from "./components/dropdown-theme";
import DropdownHeader from "./components/dropdown-header";
import { api } from "@/lib/api";
import type { FileTreeItem } from "@/types";

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
  const [accounts, setAccounts] = useState<FileTreeItem[]>([]);

  const navigate = useNavigate();

  const { isLoading } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await api.get("/menus");

      const reponseData = response.data as MessageReponse[];
      const result = reponseData.map((menu) => ({
        ...menu,
        items: menu.subMenus,
      }));

      setAccounts(result);
      return result;
    },
    enabled: !!isAutentincated,
  });

  const handleAddAccount = (data: FileTreeItem) => {
    setAccounts([...accounts, data]);
  };

  useEffect(() => {
    if (!isAutentincated) {
      navigate("/login");
    }
  }, [isAutentincated, navigate]);

  if (!isAutentincated) {
    return null;
  }

  const pageHeight = window.screen.height;

  return (
    <ResizablePanelGroup
      orientation={pageHeight > 768 ? "horizontal" : "vertical"}
      className="flex flex-col md:flex-row  min-h-screen border"
    >
      <ResizablePanel
        defaultSize={20}
        minSize={pageHeight > 768 ? 300 : 250}
        maxSize={pageHeight > 768 ? 500 : 250}
        className="bg-white dark:bg-background"
      >
        <aside className="flex flex-col md:p-4 h-full">
          <DropdownHeader handleAddAccount={handleAddAccount} />
          <hr className="mb-4 border-zinc-200" />

          <ScrollArea className="flex-1 max-h-full">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm font-medium px-2">
                <div className="flex items-center gap-2">
                  <span className="dark:text-white">Favoritas</span>
                  <MoreVertical className="h-4 w-4 text-zinc-400" />
                </div>
                <span className="text-zinc-500 dark:text-white">
                  {isLoading ? (
                    <Skeleton className="h-4 w-2" />
                  ) : (
                    accounts?.length
                  )}
                </span>
              </div>

              {isLoading ? (
                <div className="flex flex-col">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={`skeleton-row-${index}`}
                      className="flex items-center gap-3 p-2 pl-4"
                    >
                      <Skeleton className="h-4 w-4 rounded" />
                      <Skeleton className="h-5 w-5 rounded" />
                      <Skeleton className="h-4 w-32 rounded" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex flex-col gap-1">
                    {accounts?.map((item, index) => (
                      <AccountList
                        key={`account-${item.id}-${index}`}
                        fileItem={item}
                      />
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
