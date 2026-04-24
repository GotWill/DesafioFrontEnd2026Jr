import type { MessageSelected } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useMessages = () => {
  const [messages, setMessages] = useState<MessageSelected>();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [allChecked, setIsAllChecked] = useState(false);
  const [query, setQuery] = useQueryState("name", { defaultValue: "" });
  const [searchParams] = useSearchParams();
  const isSelectionMode = selectedIds.length > 0;

  const idAccount = searchParams.get("id");

  const { data } = useQuery({
    queryKey: ["messagesList", idAccount],
    queryFn: async () => {
      const response = await axios.get<MessageSelected>(
        `https://my-json-server.typicode.com/EnkiGroup/DesafioFrontEnd2026Jr/items/${idAccount}`,
      );
      setMessages(response.data);
      return response.data;
    },
    enabled: !!idAccount,
  });

  const handleSelect = (id: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [...prev, id];
    });
  };

  const handleRemoveItens = (ids: number[]) => {
    setMessages((prev) => {
      return {
        ...prev,
        subMenuItems: prev.subMenuItems.filter(
          (item) => !ids.includes(Number(item.id)),
        ),
      };
    });
    setSelectedIds([]);
  };

  const handleAllCheckedMessages = () => {
    const newValue = !allChecked;
    setIsAllChecked(newValue);
    if (newValue) {
      setSelectedIds(messages.subMenuItems.map((item) => Number(item.id)));
    } else {
      setSelectedIds([]);
    }
  };

  const filteredMessages = messages?.subMenuItems.filter((msg) =>
    msg.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );

  return {
    query,
    filteredMessages,
    isSelectionMode,
    data,
    allChecked,
    selectedIds,
    messages,
    setQuery,
    handleSelect,
    handleRemoveItens,
    handleAllCheckedMessages,
  }
};
