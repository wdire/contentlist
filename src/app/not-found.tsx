const NotFound = () => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-1 py-page-top-space">
      <div className="flex flex-col items-center">
        <div className="font-bold text-8xl flex items-center">
          4
          <div className="flex items-center text-8xl align-middle" aria-label="0">
            <span className="select-none text-7xl">[</span>0
            <span className="select-none text-7xl">]</span>
          </div>
          4
        </div>
        <div className="text-2xl font-thin leading-7">PAGE NOT FOUND</div>
      </div>
    </div>
  );
};

export default NotFound;
