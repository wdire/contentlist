import {TRASH_BOX_ID} from "@/lib/constants";
import {useAppSelector} from "@/store";
import {useDroppable} from "@dnd-kit/core";
import clsx from "clsx";
import {Trash} from "lucide-react";
import {useMemo} from "react";

const ContentTrashbox = () => {
  const activeContent = useAppSelector((state) => state.list.activeContent);

  const {setNodeRef, isOver} = useDroppable({
    id: TRASH_BOX_ID,
    disabled: !activeContent,
  });

  const isContentOver = useMemo(() => isOver && activeContent, [isOver, activeContent]);

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        "w-24 h-24 md:w-32 md:h-32 rounded-bl-xl absolute left-0 top-0 flex justify-center items-center transition-all z-20",
        {
          "scale-90 text-white bg-danger": isContentOver,
          "text-danger bg-danger/20": !isContentOver,
          "opacity-0 invisible": !activeContent,
        },
      )}
    >
      <Trash size={"26px"} />
    </div>
  );
};

export default ContentTrashbox;
