import { useEffect, useRef, useState } from "react";

export default function NavMenu(props) {
    const menuOptionsRef = useRef(null);

    const handleMenuClick = (e) => {
        if (menuOptionsRef.current) {
            console.log('====> menu options state', menuOptionsRef.current.style.display)
            let currentState = menuOptionsRef.current.style.display !== 'block' ? 0 : 1;
            if (currentState) {
                menuOptionsRef.current.style.display = 'none';
            } else {
                menuOptionsRef.current.style.display = 'block';
            }
        }
    };

    return (
        <>
            <div onClick={handleMenuClick} className="fixed cursor-pointer p-1.5 z-10 flex flex-col justify-center items-center rounded-full top-1 left-1 w-9 h-9 bg-white">
                <svg viewBox="0 0 100 80" width="30" height="30">
                    <rect width="100" height="15" rx="10"></rect>
                    <rect y="30" width="80" height="15" rx="10"></rect>
                    <rect y="60" width="100" height="15" rx="10"></rect>
                </svg>
            </div>

            <div ref={menuOptionsRef} className="fixed hidden left-2 top-10 bg-white text-black">
                <div className="flex flex-col justify-around">
                    <div><a href="./">Gallery</a></div>
                    <div><a href="./train">Train</a></div>
                    <div><a href="./quiz">Quiz</a></div>
                    <div><a href="./game">Game</a></div>
                </div>
            </div>

        </>
    )
}