import SectionContainer from "@/components/common/SectionContainer";
import {Skeleton} from "@nextui-org/react";

const Loading = () => {
  const rowHead = "w-[80px] h-[60px] sm:w-[120px] sm:h-[80px] flex-shrink-0";
  const rowBody = "ml-0.5 w-full h-[60px] sm:h-[80px]";

  return (
    <SectionContainer>
      <div className="m-auto flex min-h-screen w-full items-start overflow-x-auto overflow-y-hidden py-page-top-space">
        <div className="flex flex-col-reverse lg:flex-row justify-center w-full gap-5 max-w-full">
          <div className="flex flex-col gap-3 flex-1 lg:max-w-[900px]">
            <div className="w-full rounded-t-medium overflow-hidden">
              <div className="flex flex-col gap-y-0.5 overflow-hidden relative bg-background">
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
              </div>
            </div>
            <Skeleton className="rounded-b-medium bg-content1 w-full flex flex-col gap-3 md:gap-5 p-5">
              <div className="flex flex-col gap-3 md:gap-5">
                <h2 className="text-2xl">Box</h2>
                <div className="flex flex-grow flex-wrap min-h-[90px] md:min-h-[120px]" />
              </div>
            </Skeleton>
          </div>
          <div className="w-full lg:w-[260px] rounded-medium">
            <Skeleton className="w-full mb-5 h-[92px] rounded-medium" />
            <Skeleton className="w-full h-[326px] rounded-medium" />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Loading;
