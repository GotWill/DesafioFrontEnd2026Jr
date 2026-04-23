import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userContext } from "@/context/user";
import { ChevronDown } from "lucide-react";
import { useContext } from "react";

const DropdownHeader = () => {
  const { logout } = useContext(userContext);

  return (
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

      <button className="flex items-center gap-1 border-2 dark:hover:text-black border-black dark:border-white px-3 py-1 font-semibold text-sm hover:bg-zinc-100 transition-colors">
        New <ChevronDown className="h-4 w-4" />
      </button>
    </div>
  );
};

export default DropdownHeader;
