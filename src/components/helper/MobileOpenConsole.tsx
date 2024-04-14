"use client";

import {detectDoubleTapClosure} from "@/lib/utils/helper.utils";

const MobileOpenConsole = () => {
  return (
    <div
      className="w-16 h-16 right-0 bottom-0 absolute"
      onTouchEnd={detectDoubleTapClosure(() => {
        if (typeof window !== "undefined" && window?.innerWidth <= 900 && !window?.eruda) {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/eruda";
          document.head.append(script);
          script.onload = () => {
            if (window?.eruda?.init && typeof window.eruda.init === "function") {
              window.eruda.init();
            }
          };
        }
      })}
    ></div>
  );
};

export default MobileOpenConsole;
