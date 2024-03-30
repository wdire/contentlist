import SectionContainer from "@/components/common/SectionContainer";
import ListSkeletons from "./list.skeletons";

const Loading = () => {
  return (
    <SectionContainer paddingClass="px-0 sm:px-5">
      <div className="m-auto flex min-h-screen w-full items-start sm:overflow-x-auto sm:overflow-y-hidden py-page-top-space">
        <div className="flex flex-col-reverse lg:flex-row justify-center w-full gap-5 max-w-full relative">
          <div className="flex flex-col gap-3 flex-1 lg:max-w-[900px]">
            <div className="w-full rounded-t-medium overflow-hidden">
              <div className="flex flex-col gap-y-0.5 overflow-hidden relative bg-background">
                <ListSkeletons.RowsContainer />
              </div>
            </div>
            <ListSkeletons.Box />
          </div>
          <ListSkeletons.RightContainer />
        </div>
      </div>
    </SectionContainer>
  );
};

export default Loading;
