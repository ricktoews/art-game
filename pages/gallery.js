import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/ArtGame.module.css'
import Art from '@/data/art';
console.log(Art);
const MAX_WIDTH = 400;
const MAX_HEIGHT = 400;

const FRAME_WIDTH = 100;
const FRAME_HEIGHT = 100;

// Helper function
const makeProportionate = (newX, x, y) => { return Math.round(newX / x * y); }


export default function Gallery() {
    const baseImgStyle = { position: 'relative' };
    const thumbStyle = { maxHeight: `${FRAME_HEIGHT}px`, maxWidth: `${FRAME_WIDTH}px`};
   return (
        <div className="flex w-2/4 flex-wrap">
            { Art.map((item, key) => {
                return <div key={key} className="flex flex-col items-center w-1/5 py-3 bg-white cursor-pointer hover:bg-slate-200">
                    <div><img className="drop-shadow-lg" src={item.src} style={thumbStyle}/></div>
                    <div className="text-center text-black">{item.name}</div>
                    <div className="text-center text-black">{item.date}</div>
                </div>
            }) }
        </div>
    )
}