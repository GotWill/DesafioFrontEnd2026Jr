export type FileTreeItem = {
  id: number;
  name: string;
  items: { id: number; name: string }[];
};

export interface MessageItem {
  id: number;
  name: string;
  subject: string;
  time: string;
  duration: string;
  count?: number;
  avatarsCount: number;
}

export interface SubMenuItems {
  id: string;
  name: string;
  subject: string;
  owner: string;
  users: string[];
}

export interface MessageSelected {
  id: number;
  subMenuItems: SubMenuItems[];
}
