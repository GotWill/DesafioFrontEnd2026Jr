import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useContext } from "react";
import DialogForm from "./dialog-form";
import { userContext } from "@/context/user";
import type { FileTreeItem } from "@/types";


interface DropdownHeaderProps {
  handleAddAccount: (data: FileTreeItem) => void;
}

const DropdownHeader = ({ handleAddAccount }: DropdownHeaderProps) => {
  const { logout } = useContext(userContext);

  return (
    <div className="p-4 md:px-0 flex items-center justify-between mb-6">
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

      <DialogForm handleAddAccount={handleAddAccount} />
    </div>
  );
};

export default DropdownHeader;
