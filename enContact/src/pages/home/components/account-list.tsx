import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { FileTreeItem } from "@/types";
import { ChevronRightIcon, FolderIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";



interface AccountListProps {
  fileItem: FileTreeItem;
}

const AccountList = ({ fileItem }: AccountListProps) => {
  const [, setSearchParams] = useSearchParams();
  const handleSetId = (id: number) => {
    setSearchParams({ id: String(id) });
  };

  if ("items" in fileItem) {
    return (
      <Collapsible key={fileItem.name} className="group">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground dark:text-white"
          >
            <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
            <FolderIcon />
            {fileItem.name}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1 ml-5 style-lyra:ml-4">
          <div className="flex flex-col gap-1">
            {fileItem.items.map((item) => (
              <button
                key={item.id}
                className="text-left cursor-pointer"
                onClick={() => handleSetId(item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }
};

export default AccountList;
