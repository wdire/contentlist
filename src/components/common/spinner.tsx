import {Spinner as NSpinner} from "@nextui-org/react";

export const Spinner = () => {
  return <NSpinner />;
};

export const FullPageSpinner = () => {
  return (
    <div className="flex justify-center items-center h-36">
      <Spinner />
    </div>
  );
};
