import {DragOverlay} from "@dnd-kit/core";
import {useAppSelector} from "@/store";
import RowItem from "./RowItem";
import ContentCard from "./ContentCard";

const ContentRowDragOverlay = () => {
  const activeRow = useAppSelector((state) => state.list.activeRow);
  const activeContent = useAppSelector((state) => state.list.activeContent);

  return (
    <DragOverlay adjustScale={false}>
      {activeRow && <RowItem row={activeRow} />}
      {activeContent && <ContentCard content={activeContent} />}
    </DragOverlay>
  );
};

export default ContentRowDragOverlay;
