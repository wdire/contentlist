"use client";

import {DragOverlay} from "@dnd-kit/core";
import {useAppSelector} from "@/store";
import {ContentCardMemo} from "./ContentCard";

const ContentRowDragOverlay = () => {
  const activeContent = useAppSelector((state) => state.list.activeContent);

  return (
    <DragOverlay adjustScale={false}>
      {activeContent && (
        <ContentCardMemo isDragging={false} redirectSourcePage={false} content={activeContent} />
      )}
    </DragOverlay>
  );
};

export default ContentRowDragOverlay;
