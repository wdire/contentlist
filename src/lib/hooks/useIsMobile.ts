import debounce from "lodash.debounce";
import {useLayoutEffect, useState} from "react";

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", debounce(updateSize, 250));
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return isMobile;
};

export default useIsMobile;
