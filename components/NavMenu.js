import { useEffect, useRef, useState } from "react";

export default function NavMenu(props) {
  const menuOptionsRef = useRef(null);

  const handleMenuClick = (e) => {
    if (menuOptionsRef.current) {
      let currentState =
        menuOptionsRef.current.style.display !== "block" ? 0 : 1;
      if (currentState) {
        menuOptionsRef.current.style.display = "none";
      } else {
        menuOptionsRef.current.style.display = "block";
      }
    }
  };

  return (
    <>
      <div
        onClick={handleMenuClick}
        className=" bg-inherit fixed cursor-pointer p-1.5 z-10 flex flex-col justify-center items-center rounded-full top-1 left-1 w-9 h-9"
      >
        <svg viewBox="0 0 100 80" width="30" height="30" style={{background: 'inherit'}}>
          <rect width="100" height="15" rx="10" style={{fill: "white"}}></rect>
          <rect y="30" width="80" height="15" rx="10" style={{fill: "white"}}></rect>
          <rect y="60" width="100" height="15" rx="10" style={{fill: "white"}}></rect>
        </svg>
      </div>

      <div
        ref={menuOptionsRef}
        className="fixed hidden bg-opacity-90 z-10 p-2 top-10 bg-slate-700 text-black"
      >
        <div className="flex flex-col divide-y divide-slate-400 justify-around text-[16pt] text-gray-400">
          <div className="hover:text-gray-600 p-1">
            <a href="./">Gallery</a>
          </div>
          <div className="hover:text-gray-600 p-1">
            <a href="./practice">Practice</a>
          </div>
          <div className="hover:text-gray-600 p-1">
            <a href="./game">Game</a>
          </div>
        </div>
      </div>
    </>
  );
}
