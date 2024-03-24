import {DragOverlay} from "@dnd-kit/core";
import {useAppSelector} from "@/store";
import RowItem from "./RowItem";
import ContentCard from "./ContentCard";

const ContentRowDragOverlay = () => {
  const activeRow = useAppSelector((state) => state.list.activeRow);
  const activeContent = useAppSelector((state) => state.list.activeContent);

  return (
    <DragOverlay>
      {activeRow && <RowItem row={activeRow} />}
      {activeContent && <ContentCard content={activeContent} dragOverlay />}
    </DragOverlay>
  );
};

export default ContentRowDragOverlay;
