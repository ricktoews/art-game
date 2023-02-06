import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/ArtGame.module.css'
import Art from '@/data/art';
console.log(Art);
const MAX_WIDTH = 400;
const MAX_HEIGHT = 400;

const FRAME_WIDTH = 100;
const FRAME_HEIGHT = 100;

const selectedArt = {};

function toggleArt(identifier) {
    const item = Art.find(item => item.name === identifier);

    if (item.selected) {
        delete item.selected;
    } else {
        item.selected = true;
    }
}

// Helper function
const makeProportionate = (newX, x, y) => { return Math.round(newX / x * y); }

function GalleryItem(props) {
    const { itemkey, item, handleItemClick } = props;

    const thumbStyle = { maxHeight: `${FRAME_HEIGHT}px`, maxWidth: `${FRAME_WIDTH}px`};
    const identifier = item.name;
    const selectedItem = item.selected ? 'bg-orange-100' : 'bg-white';
    const itemClass = `flex flex-col items-center w-1/5 py-3 ${selectedItem} cursor-pointer hover:bg-slate-200`;
    if (item.selected) {
        console.log('====> GalleryItem', itemClass);
    }

    return (
        <div key={itemkey} data-identifier={identifier} onClick={handleItemClick} className={itemClass}>
            <div><img className="drop-shadow-lg" src={item.src} style={thumbStyle}/></div>
            <div className="text-center text-black">{item.name}</div>
            <div className="text-center text-black">{item.date}</div>
        </div>
    );
}

export default function Gallery() {
    const [ itemToggled, setItemToggled ] = useState('');
    const handleItemClick = e => {
        const el = e.currentTarget;
        const { identifier } = el.dataset;
        toggleArt(identifier)
        console.log('====> handleItemClick', identifier);
        setItemToggled(identifier);
    }

    console.log('====> generating gallery');
    return (
        <div className="flex w-2/4 flex-wrap">
            { Art.map((item, key) => {
                return <GalleryItem handleItemClick={handleItemClick} item={item} key={key} itemkey={key}></GalleryItem>;
            }) }
        </div>
    )
}