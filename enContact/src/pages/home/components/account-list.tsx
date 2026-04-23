import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRightIcon, FolderIcon } from "lucide-react";

type FileTreeItem = {
  id: number;
  name: string;
  items: { id: number; name: string }[];
};

interface AccountListProps {
  fileItem: FileTreeItem;
}

const AccountList = ({ fileItem }: AccountListProps) => {
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
              <p className="text-sm dark:text-white" key={item.id}>
                {item.name}
              </p>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }
};

export default AccountList;
