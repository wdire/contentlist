"use client";

import {useCallback} from "react";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  PointerSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {useAppDispatch} from "@/store";
import {listActions} from "@/store/features/list/listSlice";
import SectionContainer from "@/components/common/SectionContainer";
import debounce from "lodash.debounce";
import StorageContainer from "./StorageContainer";
import RightContainer from "./RightContainer";
import RowsContainer from "./RowsContainer";
import ContentRowDragOverlay from "./ContentRowDragOverlay";

function ListViewContainer() {
  const dispatch = useAppDispatch();

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const handleDragStart = useCallback(
    async (event: DragStartEvent) => {
      dispatch(
        listActions.onDragStart({
          activeType: event.active.data.current?.type,
          activeRow: event.active.data.current?.row,
          activeContent: event.active.data.current?.content,
        }),
      );
    },
    [dispatch],
  );

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      dispatch(
        listActions.onDragEnd({
          activeId: event.active.id,
          activeType: event.active.data.current?.type,
          overId: event?.over?.id,
          overType: event.over?.data.current?.type,
        }),
      );
    },
    [dispatch],
  );

  const handleDragMove = useCallback(
    async (event: DragMoveEvent) => {
      if (!event?.over?.id) {
        return;
      }

      dispatch(
        listActions.onDragMove({
          activeId: event.active.id,
          activeType: event.active.data.current?.type,
          overId: event?.over?.id,
          overType: event.over?.data.current?.type,
        }),
      );
    },
    [dispatch],
  );

  const handleDragCancel = useCallback(() => {
    console.log("drag cancel");
    dispatch(listActions.onDragCancel());
  }, [dispatch]);

  return (
    <SectionContainer paddingClass="px-0 sm:px-5" type="list-page">
      <div className="m-auto flex min-h-screen w-full items-start py-page-top-space">
        <DndContext
          id="main-dnd"
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={debounce(handleDragMove, 75)}
          onDragCancel={handleDragCancel}
          autoScroll={false}
          collisionDetection={pointerWithin}
        >
          <div className="flex flex-col-reverse lg:flex-row justify-center w-full gap-2.5 max-w-full relative">
            <div className="flex flex-col gap-3 flex-1 w-full">
              <RowsContainer />
              <StorageContainer />
            </div>

            <RightContainer />
          </div>

          <ContentRowDragOverlay />
        </DndContext>
      </div>
    </SectionContainer>
  );
}

export default ListViewContainer;
