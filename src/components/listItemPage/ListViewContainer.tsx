"use client";

import dynamic from "next/dynamic";
import {useCallback, useRef} from "react";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {STORAGE_ROW_ID} from "@/lib/constants";
import {useAppDispatch, useAppSelector} from "@/store";
import {restrictToWindowEdges} from "@dnd-kit/modifiers";

import {listActions} from "@/store/features/list/listSlice";
import RowItem from "./RowItem";

import StorageContainer from "./StorageContainer";
import RightContainer from "./RightContainer";
import RowsContainer from "./RowsContainer";
import SectionContainer from "../common/SectionContainer";

const ContentCard = dynamic(() => import("./ContentCard"));

function ListViewContainer() {
  const dispatch = useAppDispatch();

  const contents = useAppSelector((state) => state.list.contents);

  const activeRow = useAppSelector((state) => state.list.activeRow);
  const activeContent = useAppSelector((state) => state.list.activeContent);

  const lastOverId = useRef<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

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
      if (!event?.over?.id) {
        return;
      }

      dispatch(
        listActions.onDragEnd({
          activeId: event.active.id,
          activeType: event.active.data.current?.type,
          overId: event?.over?.id,
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

      if (lastOverId.current === event.over.id) {
        return;
      }

      lastOverId.current = event.over.id;

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

  return (
    <SectionContainer>
      <div className="m-auto flex min-h-screen w-full items-start overflow-x-auto overflow-y-hidden pt-page-top-space">
        <DndContext
          id="main-dnd"
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragMove={handleDragMove}
          onDragCancel={() => console.log("onDragCancel")}
          autoScroll={true}
          modifiers={[restrictToWindowEdges]}
          collisionDetection={pointerWithin}
        >
          <div className="flex flex-col-reverse lg:flex-row justify-center w-full gap-5 max-w-full">
            <div className="flex flex-col gap-3 flex-1 lg:max-w-[900px]">
              <RowsContainer />
              <StorageContainer
                contents={contents.filter((content) => content.rowId === STORAGE_ROW_ID)}
              />
            </div>

            <RightContainer />
          </div>

          <DragOverlay>
            {activeRow && (
              <RowItem
                row={activeRow}
                contents={contents.filter((content) => content.rowId === activeRow.id)}
              />
            )}
            {activeContent && <ContentCard content={activeContent} dragOverlay />}
          </DragOverlay>
        </DndContext>
      </div>
    </SectionContainer>
  );
}

export default ListViewContainer;
