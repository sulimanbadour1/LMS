"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";

interface ChaptersListProps {
  items: Chapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const ChaptersList = ({
  items,
  onEdit,
  onReorder,
}: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);
  // to fix the hydration issue
  useEffect(() => {
    setIsMounted(true);
  }, []);
  // to fix the hydration issue
  useEffect(() => {
    setChapters(items);
  }, [items]);
  if (!isMounted) return null;
  return (
    <div>
      <h1>ChapterList</h1>
    </div>
  );
};
