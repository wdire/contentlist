import {DragOverlay} from "@dnd-kit/core";
import {shallowEqual} from "react-redux";
import {useAppSelector} from "@/store";
import RowItem from "./RowItem";
import ContentCard from "./ContentCard";

const ContentRowDragOverlay = () => {
  const activeRow = useAppSelector((state) => state.list.activeRow);
  const activeContent = useAppSelector((state) => state.list.activeContent);
  const activeRowContents = useAppSelector(
    (state) =>
      activeRow ? state.list.contents.filter((content) => content.rowId === activeRow.id) : [],
    shallowEqual,
  );

  return (
    <DragOverlay>
      {activeRow && <RowItem row={activeRow} contents={activeRowContents} />}
      {activeContent && <ContentCard content={activeContent} dragOverlay />}
    </DragOverlay>
  );
};

export default ContentRowDragOverlay;
