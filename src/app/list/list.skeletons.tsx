import {Skeleton} from "@nextui-org/react";

const RowsContainer = () => {
  const rowHead = "w-[80px] h-[60px] sm:w-[120px] sm:h-[80px] flex-shrink-0";
  const rowBody = "ml-0.5 w-full h-[60px] sm:h-[80px]";

  return (
    <>
      <div className="flex">
        <Skeleton className={rowHead} />
        <Skeleton className={rowBody} />
      </div>
      <div className="flex">
        <Skeleton className={rowHead} />
        <Skeleton className={rowBody} />
      </div>
      <div className="flex">
        <Skeleton className={rowHead} />
        <Skeleton className={rowBody} />
      </div>
      <div className="flex">
        <Skeleton className={rowHead} />
        <Skeleton className={rowBody} />
      </div>
      <div className="flex">
        <Skeleton className={rowHead} />
        <Skeleton className={rowBody} />
      </div>
    </>
  );
};

const Box = () => (
  <Skeleton className="sm:rounded-b-medium sm:overflow-hidden shadow-[0_-3px_3px_-3px_rgba(255,255,255,0.3)] sm:shadow-none sticky sm:relative bottom-0 z-20">
    <div className="flex flex-col gap-3 md:gap-5">
      <h2 className="text-2xl">Box</h2>
      <div className="flex flex-grow flex-wrap min-h-[90px] md:min-h-[131px]" />
    </div>
  </Skeleton>
);

const RightContainer = () => (
  <div className="w-full lg:w-[260px] rounded-medium px-3 lg:px-0">
    <Skeleton className="w-full mb-5 h-[124px] rounded-medium" />
    <Skeleton className="w-full h-[326px] rounded-medium" />
  </div>
);

const ListSkeletons = {
  RowsContainer,
  Box,
  RightContainer,
};

export default ListSkeletons;
